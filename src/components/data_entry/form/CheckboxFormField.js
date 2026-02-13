import React from 'react';
import {Form} from "antd";
import CheckboxField from "../CheckboxField";

export default function CheckboxFormField({form, children, ...props}) {
    return (
        <Form.Item initialValue={false} valuePropName={props.mode === 'single'?'checked':'value'} {...form}>
            <CheckboxField {...props}>
                {children}
            </CheckboxField>
        </Form.Item>
    )
}