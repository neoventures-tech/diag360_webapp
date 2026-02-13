import React, {useEffect, useState} from 'react';
import {Space} from "antd";

import {useTranslation} from "react-i18next";
import {FlexContainer} from "../StyledComponents";
import CheckboxField from "./CheckboxField";
import Switch from "./Switch";
import Search from "./Search";
import useGenerateInputOptions from "../../hooks/useGenerateInputOptions";

export default function CheckboxWithSwitch({
                                               request,
                                               form,
                                               onChange,
                                               options = [],
                                               key_label = 'name',
                                               key_value = 'id',
                                               search,
                                               hideSwitch,
                                               translateLabelOptions = false,
                                               getSearchValues,
                                               ...props
                                           }) {
    const {t} = useTranslation()
    const [isSelectedAll, setIsSelectedAll] = useState()
    const [searchIndexes, setSearchIndexes] = useState()

    const {_options, isLoading} = useGenerateInputOptions({
        translateLabelOptions,
        request,
        options,
        key_label,
        key_value
    })


    function generateOptions() {
        return searchIndexes ? searchIndexes?.map(index => _options[index]) :
            _options
    }

    function handleCheckedAll(checked) {
        setIsSelectedAll(checked);
        const currentValuesInScreen = generateOptions().map(({value}) => value)
        const selectedValuesNotInScreen = props?.value?.filter((item) => !currentValuesInScreen.includes(item)) || []

        if (checked) {
            // adicionar os valores em tela aos que ja existe nos valores
            onChange?.([...selectedValuesNotInScreen, ...currentValuesInScreen])
        } else {
            //remove apenas os valores ques estão exibido em tela
            onChange?.(selectedValuesNotInScreen)
        }
    }

    const getSearchValuesDefault = () => (
        _options.map(option => option.label.toLowerCase())
    )
    const searchValues = search && (getSearchValues ? getSearchValues(_options) : getSearchValuesDefault())
    const onSearch = (value) => {
        value = value.toLowerCase()
        setSearchIndexes(searchValues
            .map((option, index) => (option?.toLowerCase().includes(value) ? index : -1))
            .filter((index) => index !== -1)
        )
    };


    useEffect(() => {
        function handleAutoSelectAll() {
            const hasAll = generateOptions().every(({value}) => props?.value?.includes(value));
            setIsSelectedAll(hasAll);
        }

        handleAutoSelectAll()

    }, [props.value, generateOptions()]);


    return (
        <FlexContainer direction={'column'} align={'start'} gap={8}>
            {search && <Search onSearch={onSearch} allowClear={true}
                               style={{padding: "0 8px 8px 0"}}/>}
            {!hideSwitch &&
                <Space>
                    <Switch checked={isSelectedAll} onChange={handleCheckedAll}
                            size="small"/>
                    <span>{t('All')}</span>
                </Space>
            }
            <CheckboxField
                style={{display: 'flex', flexDirection: 'column', gap: 8}}
                onChange={onChange} {...props} options={generateOptions()}/>
        </FlexContainer>
    )
}