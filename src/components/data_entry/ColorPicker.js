import React, {useState} from 'react';
import {CompactPicker} from "react-color";
import styled from 'styled-components';
import {Popover} from "antd";
import {FlexContainer} from "../StyledComponents";

const SquareColor = styled.div`
    width: 36px;
    height: 36px;
    background-color: ${({color}) => color || 'transparent'};
    box-shadow: 0px 2px 8px 0px #00000026;
    border-radius: 2px;
    cursor: pointer;
`;

const StyledCompactPicker = styled(CompactPicker)`
    ${props => props.$customizable === false && `
        > :nth-child(2) div {
            display: none;
        }   
    `}
`;


const StyledContainer = styled.div`
    div {
        box-shadow: none !important;
    }
`;

const Label = styled.span`
    white-space: break-spaces;
    min-width: 36px;
`;

export default function ColorPicker({value, label, onChange, children, customizable = true, dataCy, ...props}) {
    function handleChange(value) {
        onChange?.(value.hex)
    }

    return (
        <FlexContainer justify={'start'} gap={4} align={'flex-start'} direction={'column'} data-cy={dataCy}>
            <Popover
                trigger={'click'}
                content={
                    <StyledContainer>
                        <StyledCompactPicker

                            color={value}
                            className={'colorPicker'}
                            disableAlpha={true}
                            // colors={COLORS}
                            $customizable={customizable}
                            onChange={handleChange}
                            {...props}
                        />
                    </StyledContainer>
                }>
                <SquareColor color={value}/>
            </Popover>
            <Label>{label}</Label>
        </FlexContainer>
    )
}