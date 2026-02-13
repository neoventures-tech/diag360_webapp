import React, {useEffect, useState, useRef} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useQuery from "./useQuery";
;

export default function useTab({defaultTab = '1', removeTab = false, tabName = 'tab'}) {
    const querys = useQuery()
    const navigate = useNavigate()
    const [defaultTabId, setDefaultTabId] = useState();
    const [activeTab, setActiveTab] = useState();
    const initializedRef = useRef(false);

    const location = useLocation();
    useEffect(() => {
        let detailTab = querys.get(tabName)

        if (detailTab) {
            setDefaultTabId(detailTab)
            setActiveTab(detailTab)
            initializedRef.current = true;
        } else if (!initializedRef.current) {
            // Só inicializar o tab padrão se ainda não foi inicializado
            // Usar replace: true na primeira inicialização para não criar entrada extra no histórico
            querys.set(tabName, defaultTab)
            setActiveTab(defaultTab)
            setDefaultTabId(defaultTab)
            navigate({search: querys.toString()}, { replace: true })
            initializedRef.current = true;
        }

    }, [location.pathname]) // Mudança crítica: reagir apenas a mudanças de pathname, não search

    function setQueryTab(idTab) {
        querys.set(tabName, idTab)
        setActiveTab(idTab)
        // Usar replace: true para mudanças de tab - tabs são estado da página, não navegação histórica
        navigate({search: querys.toString()}, { replace: true })
    }

    return {setQueryTab, defaultTabId, activeTab, tabName}
}