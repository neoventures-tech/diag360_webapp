import React from 'react'
import {Form, Slider, Switch, Typography} from 'antd';


const {Text} = Typography;

export default function SliderFormField({form, ...props}) {

    return (
        <Form.Item  {...form}>
            <Slider
                marks={{
                    0: 0,
                    1: 1,
                    2: 2,
                    3: 3,
                    4: 4,
                    5: 5,
                    6: 6,
                    7: 7,
                    8: 8,
                    9: 9,
                    10: 10
                }}
                min={0}
                max={10}
                defaultValue={[0,10]}
                range
                {...props}
            />
        </Form.Item>
    )
}
