import React from 'react';
import {Input} from "antd";

export default function InputField({innerRef, ...props}){
    return (
        <Input ref={innerRef}  {...props}/>
    )
}