import React from 'react'
import {Form} from 'antd';

import InputField from "../InputField";

export default function InputFormField({form, ...props}) {

    return (
        <Form.Item {...form}>
            <InputField {...props}/>
        </Form.Item>
    )
}