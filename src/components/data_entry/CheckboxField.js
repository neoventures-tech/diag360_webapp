import React from 'react';
import {Checkbox, Col, Row} from "antd";
import styled from "styled-components";


const StyledCheckbox = styled(Checkbox)`
  
    width: 100%;
    & > span:last-child{
        max-width: 95%;
        width: 100%;
    }

`


export default function CheckboxField({
                                          mode,
                                          label,
    columns=1,
                                          children,
                                          options,
                                          ...props
                                      }) {
    const columnXS = 24/columns
    return (
        <>
            {
                mode === 'single' ? (
                    <Checkbox {...props}>{label}</Checkbox>
                ) : (
                    <Checkbox.Group  {...props} style={{width: '100%',...props?.style}}>
                        <Row gutter={[8,8]} style={{width: '100%'}}>
                            {options?.map((option) => <Col  key={option.value} xs={columnXS}>
                                <StyledCheckbox {...option}>{option?.label}</StyledCheckbox></Col>)}

                        </Row>

                    </Checkbox.Group>)
            }
        </>
    )
}