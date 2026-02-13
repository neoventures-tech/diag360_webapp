import React from 'react';
import styled from 'styled-components'
import { Spin } from 'antd';
const LoadingContainer = styled.div`
  display: flex;
  width: 100%;
  height: ${({height}) => height};
  justify-content: center;
  align-items: center;
`

function Loading({size='large', height='50vh',...props}) {
    return (
        <LoadingContainer height={height}  {...props}>
            <Spin size={size}/>
        </LoadingContainer>
    );
}

export default Loading;
