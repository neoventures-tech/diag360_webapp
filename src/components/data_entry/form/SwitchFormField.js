import React from 'react'
import {Form, Typography} from 'antd';
import Switch from "../Switch";


const {Text} = Typography;

export default function SwitchFormField({form, ...props}) {

    return (
        <Form.Item valuePropName={'checked'} {...form}>

                <Switch {...props}/>
        </Form.Item>
    )
}
