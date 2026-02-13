import React from 'react';
import {Input} from "antd";
import styled from 'styled-components';

const StyledTextArea = styled(Input.TextArea)`
    position: relative;
    width: 100%;
    textarea {
        line-height: 1.5;
    }

    :after {
        position: absolute;
        right: 8px;
        bottom: 22px;
    }

`;

export default function TextArea({innerRef, ...props}){
    return (
        <StyledTextArea  rows={4} ref={innerRef} {...props} />
    )
}