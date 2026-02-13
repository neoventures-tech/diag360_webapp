import React from 'react';
import {Form} from "antd";
import InputColor from "../InputColor";



export default function InputColorFormField({form, ...props}) {
    return (
        <Form.Item   {...form} >
            <InputColor {...props}/>
        </Form.Item>
    )
}