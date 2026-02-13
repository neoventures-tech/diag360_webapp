import React from 'react';
import {Skeleton, Radio, Space, Flex} from "antd";
import {FlexContainer} from "../StyledComponents";
import useGenerateInputOptions from "../../hooks/useGenerateInputOptions";
import Empty from "../data_display/Empty";
import WideSpace from "../layout/WideSpace";

export default function RadioField({
                                       request,
                                       key_label = 'name', key_value = 'id',
                                       mode,
                                       translateLabelOptions = false,
                                       label,
                                       direction = 'vertical',
                                       options = [],
                                       children,
                                       buttonMode,
                                       isLoading,
                                       ...props
                                   }) {

    const {_options, isLoading: internalLoading} = useGenerateInputOptions({
        request,
        options,
        key_label,
        key_value
    })


    const HAS_OPTIONS = _options?.length > 0
    const IS_LOADING = internalLoading || isLoading
    return (
        <>
            {
                mode === 'single' ? (
                    <Radio {...props}>{label}</Radio>
                ) : (
                    <Radio.Group {...props} style={{width: '100%'}}>
                        {IS_LOADING ? <RadioLoading/> : (
                            <WideSpace direction={direction}
                                       align={HAS_OPTIONS ? 'start' : 'center'}>
                                {HAS_OPTIONS ?
                                    (_options?.map((item) => {
                                        if (buttonMode) {
                                            return <Radio.Button {...item}
                                                                 key={item.value}>{item.label}</Radio.Button>
                                        }
                                        return <Radio {...item}
                                                      key={item.value}>{item.label}</Radio>

                                    })) : <Empty/>}
                            </WideSpace>
                        )}

                    </Radio.Group>)
            }
        </>
    )
}


function RadioLoading() {
    return (
        <Flex vertical gap={8} >
            <Space>
                <Skeleton.Avatar active size={12}
                                  style={{minWidth: 10}}
                                 shape={'circle'}/>
                <Skeleton.Input active size={12}
                                shape={'square'}/>
            </Space>
            <Space>
                <Skeleton.Avatar active size={12}
                                 shape={'circle'}/>
                <Skeleton.Input active size={12}
                                shape={'square'}/>
            </Space>
            <Space>
                <Skeleton.Avatar active size={12}
                                 shape={'circle'}/>
                <Skeleton.Input active size={12}
                                shape={'square'}/>
            </Space>

        </Flex>
    )
}