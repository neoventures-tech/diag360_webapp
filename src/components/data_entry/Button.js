import React from 'react';
import {Button as ButtonAnt} from "antd";
import styled from "styled-components";

const StyledButtonAnt = styled(ButtonAnt)`
    align-items: center !important;
    justify-content: center !important;
    .ant-btn-icon{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 16px;
        height: 16px;
        //background: red;
    }
    & > span:not(.ant-btn-icon) {
       
        height: 16px;
        text-align: center;
        line-height: 18px;
    }
`

export default function Button({children, ...props}){
    return (
        <StyledButtonAnt  type={"primary"} {...props}>{children}</StyledButtonAnt>
    )
}