import React from 'react'
import {Grid, Tag} from "antd";
import styled from 'styled-components'
import useBreakPoints from "@/hook/useBreakPoints";
import {DEBUG} from "@/settings.js";


const Container = styled.div`
  position: fixed;
  //top: 0;
  bottom: 0;
  left: 0;
  background: white;
  z-index: 99999;
`
export default function DevTools() {
    const screens = Grid.useBreakpoint()
    const {isPhone, isTablet, isDesktop} = useBreakPoints()
    const type = isDesktop? 'Desktop': isTablet? 'Tablet': 'Phone'
    if(!DEBUG) return null
    return (
        <Container>
            Current break point: <Tag color="orange">
                       {type}
                    </Tag>
            {Object.entries(screens)
                .filter((screen) => !!screen[1])
                .map((screen) => (
                    <Tag color="blue" key={screen[0]}>
                        {screen[0]}
                    </Tag>
                ))}
        </Container>
    )
}