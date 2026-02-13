import React, {useState} from 'react'
import {Form} from 'antd';
import {
    PhoneInput,
} from 'react-international-phone';
import 'react-international-phone/style.css';
import styled from 'styled-components';
import {useTranslation} from "react-i18next";


const StyledPhoneInput = styled(PhoneInput)`
    .react-international-phone-input {
        width: 100%;
    }

    .ant-form-item-has-error & :where(input, button) {
        border: 1px solid red;
    }

`

export default function PhoneNumberFormField({
                                                 form: {rules = [], ...form},
                                                 defaultCountry = 'br',
                                                 ...props
                                             }) {
    const {t} = useTranslation()
    const [currentCountry, setCurrentCountry] = useState()
    const [firstTime, setFirstTime] = useState(false)//gambiarra, nao toque


    function handleChange({country}) {
        if (!currentCountry || country.name !== currentCountry.name) {
            try {
                setCurrentCountry({
                ...country,
                amount: country.format ? Array.from(country.format.matchAll(/\./g)).length : 9
                })
            }catch {
            }


        }
    }


    return (
        <Form.Item  {...form} rules={[...rules,
            {
                required: props.required,
                message: t('This field is required')
            },
            {
                validator: async (rules, value) => {

                    if (!firstTime) {//gambiarra, nao toque
                        setFirstTime(true)
                        return Promise.resolve();
                    }
                    if (props.required && value === `+${currentCountry.dialCode}`) {
                        return Promise.reject(new Error(t('This field is required')))
                    }
                    value = value.replace(`+${currentCountry.dialCode}`, '')
                    // if (value.length < currentCountry.amount) {
                    //
                    //     return Promise.reject(new Error(t('Enter a valid phone number')))
                    // }

                    return Promise.resolve();

                }
            }]}>
            <PhoneNumber defaultCountry={defaultCountry}
                         handleChange={handleChange} {...props}/>

        </Form.Item>
    )
}

function PhoneNumber({handleChange, onChange, value,  ...internalProps}) {
    const correctedValue = value || "";
    return (
        <StyledPhoneInput
            onChange={(value, meta) => {
                handleChange(meta)
                onChange?.(value)
            }}
            {...internalProps}
            value={correctedValue}
        />
    );
}