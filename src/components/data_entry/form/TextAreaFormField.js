import React from 'react';
import {Form} from "antd";
import TextArea from "../TextArea";

export default function TextAreaFormField({form, ...props}) {
    return (
        <Form.Item {...form}>
            <TextArea {...props}/>
        </Form.Item>

    )
}