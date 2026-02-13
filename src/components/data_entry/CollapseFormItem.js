import styled from "styled-components";
import {Collapse, Flex, Form, Tooltip, Typography} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {neutral_2} from "../../utils/Colors";
import useSystemBreakpoint from "../../hooks/useSystemBreakpoint";

const {Text} = Typography
import TooltipInformation from "../data_display/TooltipInformation";
import Drawer from "../layout/Drawer";
import {FlexContainer} from "../StyledComponents";

const StyledCollapse = styled(Collapse)`

    width: 100%;
    background-color: #FFFFFF;
    border-radius: 8px;
    overflow: hidden;

    .ant-collapse-header {
        padding: ${props => props.$hasContent ? "16px 22px 16px 16px" : "16px"} !important;

        & .ant-collapse-expand-icon {
            align-self: center;
        }

    }

    .ant-collapse-content-box {
        padding: 0 !important;
        width: 100%;
        background: ${neutral_2};
    }

    .ant-collapse-content-box .ant-collapse {
        background: transparent;
        border-top: ${props => props.$hasContent ? "1px solid rgba(0, 0, 0, .06)" : "initial"};
        border-radius: 0;
        margin: 0;
    }

    :has(.ant-input-status-error) {
        border: ${props => props.$hasContent ? "1px solid var(--ant-error-color) !important;" : "initial"}
    }
`;

const StyledFormItem = styled(Form.Item)`
    margin: 0;
    padding: 0;

    .ant-form-item-control-input-content:has(button, input) {
        display: flex;
        justify-content: end;
    }

    .ant-form-item-explain-error {
        display: none;
    }

    .ant-input, .ant-select-selector, .ant-picker-range {
        min-width: ${props => props.$isDesktop && "365px"};
        //min-width: 365px !important;
        width: 100%;
        flex-grow: 1;
    }

    @media (min-width: 992px) {
        .ant-input, .ant-select-selector, .ant-picker-range {
            max-width: 500px;
        }
    }

`;


const StyledLabelContainer = styled.div`
    width: 100%;
    text-align: left;
    padding: 0 !important;

    label {
        padding: 0 !important;
    }

`;

const StyledPanel = styled(Collapse.Panel)`
    width: 100%;

    .ant-collapse-header > * {
        width: 100%;

    }

`;

export function useFormCollapse({initialActive = true, value} = {}) {

    const [active, setActive] = useState(initialActive);
    const [childHasErrors, setChildHasErrors] = useState(false);


    const KEY = ["1"]
    const activeKey = active ? KEY : []
    const child = useRef(null);

    const handleCollapseChange = (value) => {
        setActive(childHasErrors ? true : !!value.length);
    }

    const arrowStyle = {
        cursor: childHasErrors ? "not-allowed" : "",
    }

    const arrowTitle = "Please resolve the errors before closing the accordion";

    const getExpandIcon = ({isActive}) => (
        React.createElement(isActive ? UpOutlined : DownOutlined, {
            style: arrowStyle,
            title: arrowTitle
        })
    )

    useEffect(() => {
        if (typeof value === "boolean") {
            setActive(value)
        }
    }, [value]);

    useEffect(() => {
        const handleChildMutations = () => {
            if (child.current.getElementsByClassName("ant-form-item-explain-error").length) {
                setChildHasErrors(true);
                setActive(true);
            } else {
                setChildHasErrors(false);
            }
        };

        const childObserver = new MutationObserver(handleChildMutations);
        childObserver.observe(child.current, {childList: true, subtree: true});

        return () => {
            childObserver.disconnect();
        };
    }, []);


    return {activeKey, handleCollapseChange, child, getExpandIcon,}
}

export default function CollapseFormItem({
                                             footerContent,
                                             input,
                                             inputFormField,
                                             renderContent,
                                             drawerProps,
                                             name,
                                             label,
                                             help,
                                             rules,
                                             wideInput,
                                             inputTooltipTitle,
                                             initialOpen = false,
                                             extraFormItemProps = {},
                                             extra,
                                             ...props
                                         }) {

    const [open, setOpen] = useState(false)

    const self = useRef(null);
    const [errorsList, setErrorsList] = useState([]);

    const instance = Form.useFormInstance();
    const value = Form.useWatch(name, instance);

    const {
        activeKey,
        handleCollapseChange,
        child,
        getExpandIcon,
    } = useFormCollapse({value: value || initialOpen})
    const isRequired = rules?.some(item => item.required === true)

    useEffect(() => {

        const handleSelfMutations = () => {
            if (self.current.getElementsByClassName("ant-form-item-explain-error").length) {
                setErrorsList(instance.getFieldError(name));
            } else {
                setErrorsList([]);
            }
        }

        const selfObserver = new MutationObserver(handleSelfMutations);
        selfObserver.observe(self.current, {childList: true, subtree: true});

        return () => {
            selfObserver.disconnect();
        };
    }, []);

    const inputColumnConfig = !wideInput ? {md: 8, xs: 24} : {xs: 24}
    const labelColumnConfig = !wideInput ? {
        xs: (24 - inputColumnConfig?.xs || 0) || 24,
        md: 24 - inputColumnConfig?.md || 0
    } : {}

    const {isDesktop} = useSystemBreakpoint()

    const labelFlexProps = {
        style: {width: "100%"},
        vertical: true,
        grow: true,
    }

    const inputFlexProps = {
        style: {width: (wideInput || !isDesktop) && "100%"},
        vertical: true,
        grow: true,
        justify: "end",
    }

    const inputContainerRef = useRef()

    return (
        <>
            <StyledCollapse
                $hasContent={!!renderContent}
                activeKey={activeKey}
                onChange={handleCollapseChange}
                bordered={false}
                expandIconPosition="end"
                expandIcon={getExpandIcon}
            >
                <Collapse.Panel
                    key="1"
                    showArrow={!!renderContent}
                    collapsible="icon"
                    forceRender={true}
                    header={
                        <Flex vertical gap={16}>
                            <Flex style={{alignItems: "center"}}
                                  justify="space-between"
                                  vertical={wideInput || !isDesktop} gap={8}>
                                <Flex {...labelColumnConfig} {...labelFlexProps}>
                                    {label &&
                                        <StyledLabelContainer>
                                            <label>
                                                <Flex gap={4}>
                                                    {isRequired &&
                                                        <Text type="danger">*</Text>
                                                    }
                                                    {label}
                                                    {drawerProps &&
                                                        <TooltipInformation
                                                            onClick={() => setOpen(true)}
                                                        />
                                                    }
                                                </Flex>
                                            </label>
                                        </StyledLabelContainer>
                                    }
                                    {help &&
                                        <Text type="secondary">{help}</Text>
                                    }
                                </Flex>
                                <Flex {...inputColumnConfig} {...inputFlexProps} ref={inputContainerRef}>
                                    <div ref={self}>
                                        {input &&
                                            <Tooltip title={inputTooltipTitle}>
                                                <StyledFormItem
                                                    {...extraFormItemProps}
                                                    name={name}
                                                    rules={rules}
                                                    $isDesktop={isDesktop}
                                                >
                                                    {React.cloneElement(input, {
                                                        width: ((!isDesktop && input?.type?.name === "CkEditor") && `${inputContainerRef?.current?.offsetWidth}px`)
                                                    })}
                                                </StyledFormItem>
                                            </Tooltip>
                                        }
                                        {inputFormField &&
                                            <FlexContainer
                                                justify={'end'}
                                                style={{minWidth: 365}}
                                            >
                                                {inputFormField}
                                            </FlexContainer>
                                        }
                                    </div>
                                    <Flex>
                                        {errorsList?.map((error) => (
                                            <Text type="danger">{error}</Text>
                                        ))}
                                    </Flex>
                                </Flex>
                            </Flex>
                            {footerContent && <div style={{width: '100%'}}>
                                {footerContent}
                            </div>}

                        </Flex>

                    }
                    {...props}

                >
                    <div ref={child}>
                        {renderContent && renderContent(value)}
                    </div>
                </Collapse.Panel>
            </StyledCollapse>
            {drawerProps &&
                <Drawer open={open} onClose={() => setOpen(false)}
                        width={520} {...drawerProps}>
                    {drawerProps?.content}
                </Drawer>
            }
        </>
    );
}