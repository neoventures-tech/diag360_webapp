import React, {useEffect, useMemo, useState} from 'react';
import {TreeSelect as AntTreeSelect} from "antd";

export default function TreeSelect({
                                       optionsSettings,//se não tiver tem que formatar o treedata fora
                                     treeData = [],
                                       ...props
                                   }) {

    function formatOptions(options, optionsSettings) {
        return options?.map((option) => {
            const newOption = {}
            Object.keys(optionsSettings).forEach((key) => {
                if (key === 'selectable') {
                    newOption[key] = optionsSettings[key]
                } else if (key === 'children') {
                    const newOptionsSettings = {...optionsSettings[key]}
                    delete newOptionsSettings['name']
                    newOption[key] = formatOptions(option[optionsSettings[key].name], newOptionsSettings)
                } else {
                    newOption[key] = option[optionsSettings[key]]
                }

            })
            return newOption
        })
    }

    const treeDataFormatted = useMemo(()=> {
        if (optionsSettings && treeData?.length > 0) {
            return formatOptions(treeData, optionsSettings)
        }else{
            return treeData
        }
    },[treeData]);

    return (
        <AntTreeSelect treeNodeFilterProp={'title'} allowClear {...props} treeData={treeDataFormatted}/>
    );
}