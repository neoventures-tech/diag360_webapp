import React, {useEffect, useState} from 'react';
import {Divider, Empty, Typography} from "antd";

import {useTranslation} from "react-i18next";
import {FlexContainer} from "../StyledComponents";
import CheckboxField from "./CheckboxField";
import Switch from "./Switch";
import useDefaultGetRequest from "../../hooks/useDefaultGetRequest";
import Search from "./Search";
import Loading from "../feedback/Loading";

export default function CheckboxWithSwitchShowSelected({
                                                           value: values = [],
                                                           onChange,
                                                           disabled,
                                                           keyValue = 'id',
                                                           keylabel,
                                                           labelComponent,
                                                           request
                                                       }) {
    const {t} = useTranslation()


    const [search, setSearch] = useState('')
    const [isCheckedAll, setIsCheckedAll] = useState(false)
    const [selectedTags, setSelectedTags] = useState([])
    const [_savedTags, _setSaveTags] = useState([])

    const dependence_request = request?.dependence || []
    const {
        data: checkOptions,
        isLoading: isLoadingOptions
    } = useDefaultGetRequest({
        ...request,
        params: {
            search: search,
            ...request?.params
        },
        makeRequest: !!request.url,
        dataDefault: [],
        dependence: [search, ...dependence_request]
    })

    useEffect(() => {
        if (checkOptions?.length > 0) {
            _setSaveTags((savedTags = []) => {
                const newTagList = [...savedTags]
                checkOptions.forEach((tag) => {
                    if (newTagList.some((({id}) => id === tag.id))) return
                    newTagList.push(tag)
                })

                return newTagList
            })
        }
    }, [checkOptions])

    const CURRENT_LISTED_TAGS_IDS = checkOptions?.map(({id}) => id)


    useEffect(() => {

        if (checkOptions?.length > 0 && selectedTags?.length > 0) {
            // onChange?.(selectedTags.map(({id}) => id))

            handleAutoCheckAll(selectedTags.map(({id}) => id))

        }
    }, [checkOptions]);

    useEffect(() => {

        if (checkOptions?.length > 0 && values?.length > 0) {

            setSelectedTags((selectedTags) => {

                const newSelectedList = selectedTags.filter((tag) => values.includes(tag.id))
                return newSelectedList

            })


        }

        handleAutoCheckAll(values)
    }, [values]);


    useEffect(() => {
        if (checkOptions?.length > 0) {
            handleAutoCheckAll(values)
        }
    }, [checkOptions])

    function renderLabelComponent(tag) {
        if (labelComponent) return labelComponent?.(tag)
        return tag[keylabel]
    }

    function options() {
        if (checkOptions?.length > 0) {
            return checkOptions.map((tag) => ({
                label: renderLabelComponent(tag),
                value: tag[keyValue]
            }))
        }
        return []
    }

    function optionsSelecteds() {
        if (values?.length > 0) {
            return _savedTags.filter(({id}) => values.includes(id)).map((tag) => ({
                label: renderLabelComponent(tag),
                value: tag[keyValue]
            }))

        }
        return []
    }


    function handleCheckAllListedTags(check) {
        // setIsCheckedAll(check)

        if (check) {

            // onChange?.(CURRENT_LISTED_TAGS_IDS)
            handleCheckCheckboxListTags(CURRENT_LISTED_TAGS_IDS)
        } else {
            const newValues = values.filter((id) => !CURRENT_LISTED_TAGS_IDS.includes(id))
            onChange?.(newValues)


        }
    }

    function handleCheckCheckboxListTags(valuesIds) {

        let newValues = []
        values.forEach((value) => {


            if (!checkOptions.some(({id}) => id === value)) {
                newValues.push(value)
            } else {
                const indexItem = valuesIds.indexOf(value)

                if (indexItem !== -1) {
                    valuesIds.splice(indexItem, 1)
                    newValues.push(value)

                }
            }

        })
        newValues = [...newValues, ...valuesIds]
        handleAutoCheckAll(valuesIds)

        onChange?.(newValues)
    }


    function handleAutoCheckAll(values = []) {


        let checkAll = values?.length > 0
        if (values?.length > 0) {

            checkOptions?.forEach((tag) => {
                if (!values.some((id) => id === tag[keyValue])) {

                    checkAll = false
                }
            })
        }

        setIsCheckedAll(checkAll)
    }


    function handleDeselectTags(values) {
        onChange?.(values)
    }

    return (

        <FlexContainer direction={'column'}
                       align={'start'} gap={16}>

            <Switch
                size={'small'}
                disabled={disabled}
                checked={isCheckedAll}
                onChange={handleCheckAllListedTags}
                label={t('Select all')}/>
            <Search onSearch={(value, e) => {

                e.preventDefault()
                setSearch(value)
            }} disabled={disabled}/>
            {isLoadingOptions ?
                <Loading height={'150px'}/> : checkOptions?.length > 0 ?
                    <CheckboxField
                        disabled={disabled}
                        value={values}
                        onChange={handleCheckCheckboxListTags}
                        columns={2}
                        options={options()}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8
                        }}
                        // onChange={onChange} {...props}
                    /> : <Empty style={{width: '100%'}}/>}
            {values?.length > 0 && search && <>
                <Divider><Typography.Text
                    style={{fontSize: 12, color: '#00000073'}}
                    type={'secondary'}>{t('Already selected')}</Typography.Text></Divider>
                <CheckboxField
                    disabled={disabled}
                    value={values}
                    onChange={handleDeselectTags}
                    columns={2}
                    options={optionsSelecteds()}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8
                    }}
                />

            </>}

        </FlexContainer>


    )
}