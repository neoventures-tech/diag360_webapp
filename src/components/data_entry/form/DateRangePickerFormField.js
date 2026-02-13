import React from 'react';
import {Form} from "antd";
import DateRangePicker from "../DateRangePicker";

export default function DateRangePickerFormField({form, ...props}) {
    return (
        <Form.Item {...form}>
            <DateRangePicker
                // useFirtsOnChange={false} style={{width: '100%'}}
                {...props}
            />
        </Form.Item>
    )
}