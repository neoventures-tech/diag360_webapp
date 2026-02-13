import React from 'react'
import { Space, Switch as SwitchAntd, Typography} from 'antd';

export default function Switch({form, label = '', ...props}) {

    return (
        <Space><SwitchAntd {...props}/>
            {label && <span>{label}</span>}</Space>

    )
}
