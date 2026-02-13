import React from 'react'
import {Form, Typography} from 'antd';
import DomainTags from "../DomainTags";


const {Text} = Typography;

export default function DomainTagsFormField({form, ...props}) {
    return (
        <Form.Item {...form}>
                 <DomainTags {...props}/>
        </Form.Item>
    )
}