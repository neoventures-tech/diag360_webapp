import React from 'react';
import {Space} from "antd";
import styled from 'styled-components';
import {blue_1, neutral_2} from "../../utils/Colors";

const Button = styled.div`
  padding: 12px 44px;
  border-radius: 4px;
  border: 1px solid ${neutral_2};
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background: ${blue_1};
  }

`

export default function CustomButton({children, size=8, icon, ...props}) {
    return (
        <Button {...props}>
            <Space size={size}>
                {children}
            </Space>
            {icon}
        </Button>
    )
}