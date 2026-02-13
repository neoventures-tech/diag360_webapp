import React from 'react';
import {Form} from "antd";
import CheckboxWithSwitch from "../CheckboxWithSwitch";

export default function CheckboxWithSwitchFormField({form, ...props}) {

    return (
        <Form.Item {...form}>
            <CheckboxWithSwitch  {...props}/>
        </Form.Item>

    )
}