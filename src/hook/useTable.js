import {useEffect, useState} from "react";
import api from "../services/api";
import {BuildFieldErrorsDict} from "../utils/Utils";


export default function useTable({
                                     dependence = [],
                                     request,
                                     hasPagination = true,
                                     fetchData,
                                     // search = '',
                                     pageSize = 10,
                                     useHandleRequestTable = true, body,
                                     addLoadbidding_item = true,
                                     preservePage = true
                                 }) {
    const [tableData, setTableData] = useState([])
    const [totals, setTotals] = useState()
    const [resumes, setResumes] = useState()
    const [response, setResponse] = useState(null)
    const [isLoading, setIsLoading] = useState()
    const [order, setOrder] = useState()
    const [firstRequest, setFirstRequest] = useState(true);


    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: pageSize
        },
    });

    function resetTable() {
        handleTableChange({
            ...tableParams.pagination,
            current: 1
        })
    }


    function handleRequestTable() {
        if (firstRequest) {
            handleTableChange(tableParams.pagination, null, tableParams.sorter)
            setFirstRequest(false)
        } else if (preservePage) {
            // Preserva a página atual, apenas recarrega os dados
            handleTableChange(tableParams.pagination, null, tableParams.sorter)
        } else {
            resetTable()
        }
    }

    useEffect(() => {
        if (useHandleRequestTable && (request.hasOwnProperty('makeRequest') && request?.makeRequest) || !request.hasOwnProperty('makeRequest')) {
            handleRequestTable()
        }
// eslint-disable-next-line
    }, [JSON.stringify(request), request?.makeRequest, ...dependence])

    const handleTableChange = (pagination, filters, sorter, extra) => {
        let orderAux = '';
        let _order = order;
        if (sorter && sorter.order && Object.keys(sorter).length > 0) {
            orderAux = sorter.order === 'ascend' ? '' : '-'
            orderAux += sorter.column.sorter
            setOrder(orderAux)
            _order = orderAux
        } else if (sorter && sorter.order === undefined) {
            setOrder('')
            _order = orderAux
        }
        let fetchInfo = fetchData ? fetchData : fetchDataDefault
        fetchInfo({
            setIsLoading,
            pagination,
            order: _order,
            setTableParams,
            setTableData,
            setTotals,
            setResumes,
            setResponse,
            firstRequest
        });

    };

    const fetchDataDefault = async ({
                                        setIsLoading,
                                        pagination,
                                        order,
                                        setTableParams,
                                        setTableData,
                                        setTotals,
                                        setResumes,
                                        setResponse
                                    }) => {

        // Função de exemplo e fetch default
        try {
            setIsLoading(true)
            let queryParams = {}

            if (hasPagination) {
                queryParams.page_size = pagination.pageSize
                queryParams.page = pagination.current

            }
            if (order) {
                queryParams.ordering = order;
            }
            // if (search) {
            //     queryParams.search = search;
            // }


            if (request.params) {
                queryParams = {...queryParams, ...request.params}
            }
            let response;
            if (body) {
                response = await api.post(request.url, body, {params: queryParams});
            } else {
                response = await api.get(request.url, {params: queryParams});
            }

            let data, total;
            if (hasPagination) {
                data = response.data.results
                total = response.data.count
                if (response.data.totals) {
                    setTotals(response.data.totals)
                }
                if (response.data.resumes) {
                    setResumes(response.data.resumes)
                }
            } else {
                data = response.data
            }
            setTableData(data)
            setResponse(response) // Armazena response completo
            setTableParams((tableParams) => {
                return {
                    ...tableParams,
                    pagination: {
                        ...pagination,
                        total: total
                    }
                }
            })
        } catch (error) {
            setResponse(error.response)
            if (error.response?.data?.code === 'not_found' && !firstRequest) {

                resetTable()
            } else {
                BuildFieldErrorsDict(error, null, false)
            }
        } finally {
            setIsLoading(false);
        }
    };

    function updateRow(newRow, recordID){
        setTableData(oldTableData => {
            const index = oldTableData.findIndex(row => row.id === recordID);
            debugger
            oldTableData[index] = {... oldTableData[index], ...newRow};
            return [...oldTableData];
        })
    }


    return {
        updateRow,
        isLoading,
        tableData,
        setTableData,
        totals,
        tableParams,
        setTableParams,
        resumes,
        response,
        resetTable,
        handleTableChange,
        handleRequestTable
    }
}