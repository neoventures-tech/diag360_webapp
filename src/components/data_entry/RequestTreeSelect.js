import { useEffect, useState } from 'react';
import api from "../../services/api";
import TreeSelect from './TreeSelect';



function RequestTreeSelect({url, urlParams, enableCollapseLoad, disabled, allowAutoExpand, treeDataSimpleMode=true, ...props}) {
    const [treeData, setTreeData] = useState();
    const [expandKeys, setExpandedKeys] = useState([]);
    
    const fetchData = async () => {
        try {
            setTreeData(null);
            if (disabled) return;
            const {data} = await api.get(url, {params: urlParams});
            setExpandedKeys(data.map((d)=>d.id));
            setTreeData(data);
        } catch (error) {}
    }

    const handleLoadData = async (record) => {
        if (!record["@query"] || record.isLeaf) {
            return;
        }
        const {data}= await api.get(url, {params: {...urlParams, parent: record.id, query: record["@query"]}})
        setTreeData(prev=>[...prev, ...data]);
    }

    const handleTreeExpand = (keys) => {
        !treeDataSimpleMode && setTreeData(null);
        setExpandedKeys(keys);
    };

    useEffect(() => {
        url && void fetchData();
    }, [url, urlParams, disabled]);
    
    return (
        <TreeSelect 
            {...props}
            treeData={treeData}
            loadData={handleLoadData}
            disabled={disabled}
            treeDataSimpleMode={true}
            onTreeExpand={(keys)=>handleTreeExpand(keys)}
            treeExpandedKeys={expandKeys}
        />
    );
}

export default RequestTreeSelect;