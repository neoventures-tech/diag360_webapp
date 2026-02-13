import React from 'react'
import {Form, Typography} from 'antd';
import DomainTags from "../DomainTags";

import EmailTags from "../EmailTags";

const {Text} = Typography;

export default function EmailTagsFormField({form, ...props}) {
    return (
        <Form.Item {...form}>
                 <EmailTags {...props}/>
        </Form.Item>
    )
}