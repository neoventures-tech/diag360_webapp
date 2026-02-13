import React from 'react'
import {Form, Typography} from 'antd';
import RequestSelect from "../RequestSelect";
 //todo mudar para o dos meninos

const {Text} = Typography;

export default function RequestSelectFormField({labelField='name', form, url, shortInfo, ...props}) {
    return (
        <Form.Item help={shortInfo} {...form}>
            <RequestSelect url={url} labelField={labelField} {...props}/>
        </Form.Item>
    )
}