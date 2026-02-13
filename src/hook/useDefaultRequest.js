import {useEffect, useState, useTransition} from "react";
import api from "../services/api";
import {BuildFieldErrorsDict} from "../utils/Utils";
import {useNavigate} from "react-router-dom";
import {ToastNotification} from "../components/feedback/ToastNotification";

export default function useDefaultRequest({
                                              url,
                                              params,
                                              makeRequest = true,
                                              hasPagination = false,
                                              dataDefault = '',
                                              body,
                                              setExternalData,
                                              redirectRoute,
                                              dependence = []
                                          }) {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(dataDefault)
    const navigate = useNavigate()
    const [response, setResponse] = useState({})
    // useEffect(() => {
    //     if (clearData) {
    //         _setData(dataDefault)
    //         setIsLoading(false)
    //         setResponse({})
    //     }
    // }, [clearData])
    useEffect(() => {

        if (makeRequest) fetchData()
    }, [...dependence, makeRequest])

    async function refetch() {
        await fetchData()
    }

    const fetchData = async (nextURL) => {
        try {
            setIsLoading(true)
            const _url = nextURL || url
            let response;
            if (body) {
                response = await api.post(_url, body, {params: params});
            } else {
                response = await api.get(_url, {params: params});
            }

            setResponse(response)
            let responseData
            if (hasPagination) {
                if (nextURL) {
                    responseData = [...data, ...response.data.results]
                } else {
                    responseData = response.data.results
                }
            } else {
                responseData = response.data
            }
            setData(responseData)
            setExternalData?.(responseData)
        } catch (error) {
            if (redirectRoute && error.response?.status === 404) {
                navigate(redirectRoute)
                ToastNotification('Não encontado', 'error')
            } else {
                BuildFieldErrorsDict(error, null, false)
            }
        } finally {
            setIsLoading(false);
        }
    }

    function nextPage() {
        if (response.data.next) {
            fetchData(response.data.next)

        }

    }

    return {
        data,
        response,
        isLoading,
        nextPage,
        refetch
    }
}