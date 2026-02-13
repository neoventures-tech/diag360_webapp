import React from 'react'
import {Form, Typography} from 'antd';
import Select from "../Select";
 //todo mudar para o dos meninos

const {Text} = Typography;

export default function SelectFormField({form, optionFilterProp="label", ...props}) {

    return (
        <Form.Item {...form} >
            <Select  optionFilterProp={optionFilterProp}  {...props}/>
        </Form.Item>
    )
}