import React from 'react'
import {Button, Form, Typography} from 'antd';

import {AttachmentUploader} from "../AttachmentUploader";
import {useTranslation} from "react-i18next";

const {Text} = Typography;

export default function AttachmentFormField({form, ...props}) {
    const {t} = useTranslation()
    return (
        <Form.Item {...form} valuePropName={'fileList'}>
            <AttachmentUploader {...props}>
                <Button>{t("Click to Upload")}</Button>
            </AttachmentUploader>
        </Form.Item>
    )
}