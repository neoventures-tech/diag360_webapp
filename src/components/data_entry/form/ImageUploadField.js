import React from 'react'
import {Form, Typography} from 'antd';

import ImageUpload from "../ImageUpload";

const {Text} = Typography;

export default function ImageUploadField({form, ...props}) {

    return (
        <Form.Item {...form}  valuePropName="fileList">
            <ImageUpload {...props}/>
        </Form.Item>
    )
}