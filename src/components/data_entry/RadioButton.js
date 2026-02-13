import React from 'react';
import {Radio} from "antd";
import TruncateText from '../responsive/TruncateText';

export default function RadioButton({children, onChange, options, ...props}) {
    return (
        <Radio.Group onChange={(event) => onChange && onChange(event.target.value, event)} {...props}>
            {children ? children : (
                options.map(({label, value}) => (
                    <Radio.Button value={value}>
                        <TruncateText>{label}</TruncateText>
                    </Radio.Button>
                ))
            )}

        </Radio.Group>
    )
}