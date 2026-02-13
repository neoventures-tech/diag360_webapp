import React from 'react';
import {ColorPicker} from "antd";


export default function InputColor({...props}) {

    return (
        <ColorPicker  {...props} onChange={(c) => {
            props.onChange(c.toHexString());
        }}/>
    )
}