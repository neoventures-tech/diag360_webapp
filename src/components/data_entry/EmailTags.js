import React, {useState} from 'react';
import {ToastNotification} from "../feedback/ToastNotification";
import {Select} from "antd";
import {useTranslation} from "react-i18next";


export default function EmailTags({onChange, value, ...props}) {
    const {t} = useTranslation()
    const [lastValues, setLastValues] = useState(value ?? [])
    return (
        <Select mode="tags" data-cy="email-tags-select" value={value} onChange={(values) => {

            let newValues = values
            if (lastValues.length < values.length) {
                let newItem = values.pop()

                function validateDomain(item) {
                    if (!/^[a-z0-9\S]+@[a-z0-9]+.[a-z]+(.?([a-z]+))+?$/.test(item)) {
                        ToastNotification(t("Email format is incorrect"), 'error');
                        return false
                    }

                    let hasDomain = values.find((value) => {
                        return value === item
                    })
                    if (hasDomain) {
                        ToastNotification(t("Already exists this email."), 'error');
                        return false
                    }
                    return true
                }

                if (validateDomain(newItem)) {
                    newValues.push(newItem)
                }

            } else {
                newValues = values
            }
            setLastValues(newValues)
            onChange?.(newValues)
            return newValues
        }} open={false} {...props}/>
    )
}