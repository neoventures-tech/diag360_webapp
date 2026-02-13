import { Form } from 'antd';
import React from 'react';
import RequestTreeSelect from '../RequestTreeSelect';

function RequestTreeSelectFormField({form, ...props}) {
    return (
        <Form.Item {...form}>
            <RequestTreeSelect {...props} />
        </Form.Item>
    );
}

export default RequestTreeSelectFormField;