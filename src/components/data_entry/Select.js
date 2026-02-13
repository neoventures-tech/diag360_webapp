import React from 'react';
import {Select as AntSelect} from "antd";
import styled from "styled-components";


const StyledAntSelect = styled(AntSelect)`
    height: min-content;

    .ant-select-selection-item {

        white-space: wrap;

    }
`
export default  function Select(props) {

    const filterOption = (input, option) =>
        (option?.rawLabel ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <StyledAntSelect  filterOption={filterOption} {...props}/>
    );
}