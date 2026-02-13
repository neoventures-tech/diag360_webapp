import React from 'react';
import InputField from "../InputField";
import {Form, Input} from "antd";

export default function PasswordFormField({form, ...props}) {
    return (
        <Form.Item {...form}>
            <Input.Password {...props}/>
        </Form.Item>
    )
}