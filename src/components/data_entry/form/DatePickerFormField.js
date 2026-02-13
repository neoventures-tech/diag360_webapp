import React from 'react';
import {Form} from "antd";
import DatePickerLocal from "../DatePickerLocal";

export default function DatePickerFormField({form, ...props}) {
    return (
        <Form.Item {...form}>
            <DatePickerLocal useFirtsOnChange={false} style={{width: '100%'}}
                {...props}
            />
        </Form.Item>
    )
}