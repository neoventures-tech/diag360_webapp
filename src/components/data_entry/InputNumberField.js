import React from 'react';
import {InputNumber} from "antd";
import styled from 'styled-components';

const StyledInputNumber = styled(InputNumber)`
  width: 100%;
`

export default function InputNumberField({...props}){
    return (
        <StyledInputNumber {...props}/>
    )
}