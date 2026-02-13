import React from 'react'
import {Form, Typography} from 'antd';
import TreeSelect from "../TreeSelect";



export default function TreeSelectFormField({
                                                form,
                                                optionFilterProp = "label",
                                                ...props
                                            }) {

    return (
        <Form.Item {...form}>
            <TreeSelect optionFilterProp={optionFilterProp} {...props}/>
        </Form.Item>
    )
}