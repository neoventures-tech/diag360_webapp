import React, {useEffect, useState} from "react";
import api from "../../services/api";
import Select from "./Select";
import {useTranslation} from "react-i18next";
import CustomTag from "../tag/CustomTag";
import styled from "styled-components";

const StyledSelect = styled(Select)`
    .ant-select-selection-overflow {
        gap: 4px;
    }
    max-width: inherit;
`

export default function RequestSelect({
                                          url,
                                          urlParams,
                                          valueField = "id",
                                          labelField,
                                          formatLabel,
                                          dataAccessor,
                                          renderTags = false,
                                          paginated = false,
                                          showSearch = true,
                                          translate = true,
                                          preserveData = false,
                                          isChoiceArray = false,
                                          onLoadValue,
                                          value,
                                          version = "v1", // deprecated
                                          onChange,
                                          defaultActiveFirstOption,
                                          tagProps,
                                          disabled,
                                          ...props
                                      }) {

    const {t} = useTranslation()
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);


    formatLabel = formatLabel ? formatLabel : (item, defaultValue) => defaultValue;

    const getFormattedLabel = (item) => {
        if (isChoiceArray) {
            if (typeof item === "string") {
                return translate ? t(item) : item
            }
            return translate ? t(item[1]) : item[1];
        }
        return translate ? t(item[labelField]) : item[labelField]
    }

    const getValue = (item) => {
        if (isChoiceArray) {
            if (typeof item === "string") {
                return item;
            }
            return item[0];
        }
        return item[valueField];
    }


    const getChoice = (item) => {
        return {
            label: renderTags ?
                <CustomTag {...item} {...tagProps} /> : formatLabel(item, getFormattedLabel(item)),
            rawLabel: formatLabel(item, getFormattedLabel(item)),
            value: getValue(item),
            data: preserveData ? item : undefined,
        }
    }

    const fetchData = async () => {
        try {
            setIsLoading(true)
            const response = await api.get(url, {params: urlParams, version});
            let data
            let items = response.data;
            if (dataAccessor) {
                items = response[dataAccessor]
            }
            if (paginated) {
                items = items['results'];
            }

            data = items.map((item) => getChoice(item));

            if (!value && defaultActiveFirstOption) {
                onChange(data[0]?.value, data);
            }
            setOptions(data);
        } catch (error) {
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        url && void fetchData();
    }, [url, urlParams, disabled]);

    useEffect(() => {
        if (value && options.length > 0 && onLoadValue) {
            const option = options.find((option) => option.value === value);
            onLoadValue(option);
        }
    }, [value, options]);

    const tagRender = (value) => {
        if (!React.isValidElement(value.label)) {
            return value.label;
        }
        return React.cloneElement(value.label, {closable: true, onClose: value.onClose});
    }

    return (
        <StyledSelect options={options} showSearch={showSearch}
                onChange={onChange}
                loading={isLoading}
                value={isLoading?[]:value}
                disabled={disabled}
                tagRender={renderTags && tagRender}
                {...props}
        />
    );
}

