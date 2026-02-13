import React from 'react'
import {Form, Typography} from 'antd';

import InputNumberField from "../InputNumberField";

const {Text} = Typography;

export default function InputNumberFormField({form, ...props}) {

    return (
        <Form.Item {...form}>
            <InputNumberField {...props}/>
        </Form.Item>
    )
}