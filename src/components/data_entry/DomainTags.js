import React, {useState} from 'react';
import {ToastNotification} from "../feedback/ToastNotification";
import {Select} from "antd";
import {useTranslation} from "react-i18next";


export default function DomainTags({onChange, value, ...props}) {
    const {t} = useTranslation()
    const [lastValues, setLastValues] = useState(value ?? [])


    return (
        <Select mode="tags"
            // value={value}
                value={value?.map((item) => {
                    if (!(item.at(0) === '@')) {
                        return `@${item}`
                    }
                    return item

                })}
                onChange={(values) => {

                    let newValues = values
                    if (lastValues.length < values.length) {
                        let newItem = values.pop()

                        function validateDomain(item) {
                            if (!/^@?[A-Za-z0-9.-]+\.[A-Za-z]+$/.test(item)) {
                                ToastNotification(t("Domain format is incorrect"), 'error');
                                return false
                            }
                            let newItem = item
                            if (newItem.charAt(0) === "@") {
                                newItem = newItem.split('@')[1]
                            }
                            let hasDomain = values.find((value) => {
                                const currentValue = value.split('@')[1]
                                return currentValue === newItem
                            })
                            if (hasDomain) {
                                ToastNotification(t("Already exists this domain."), 'error');
                                return false
                            }
                            return true
                        }

                        if (validateDomain(newItem)) {
                            if (!(newItem.at(0) === '@')) {
                                newItem = `@${newItem}`
                            }
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