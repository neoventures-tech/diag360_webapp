import React from 'react';
import {Form} from "antd";
import ColorPicker from "../ColorPicker";



export default function ColorPickerFormField({children, form, ...props}) {
    return (
        <Form.Item   {...form}>
            <ColorPicker {...props}/>
        </Form.Item>
    )
}