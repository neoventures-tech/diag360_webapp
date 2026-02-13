import React from 'react';
import {Form} from "antd";
import CheckboxField from "../CheckboxField";
import RadioField from "../RadioField";

export default function RadioFormField({children, form, ...props}) {
    return (
        <Form.Item  valuePropName={props.mode === 'single'?'checked':'value'} {...form}>
            <RadioField {...props}/>
        </Form.Item>
    )
}