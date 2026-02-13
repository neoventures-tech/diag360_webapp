import { Dropdown, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {useEffect, useState} from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const { Text } = Typography;
const StyledDropdownSeparator = styled(Space)`
  * { font-size: 14px !important; }
`
export default function DynamicDropdown({ title, items, selectedKey, handleChange, trigger, color, container, disabled, icon,...props}) {
    const { t } = useTranslation();
    const getSelectedItem = (newKey) => {
        return items.find((item) => String(item.key) === String(newKey));
    };

    const [selectedItem, setSelectedItem] = useState();

    const handleClick = (event) => {
        const newSelection = getSelectedItem(event.key);
        setSelectedItem(newSelection);
        handleChange && handleChange(newSelection);
    };

    useEffect(()=>{
        if (items) {
            const firstItem = items[0];
            const firstKey = selectedKey ?? selectedItem?.key  ?? firstItem?.key;
            const item = getSelectedItem(firstKey);
            setSelectedItem(item);
        }
    }, [items, selectedItem, selectedKey])


    return (
        <StyledDropdownSeparator style={{ flexWrap: "wrap"}}>
            {title !== undefined && <Text>{title}</Text>}
            <Dropdown
                getPopupContainer={(defaultContainer)=>container?container:defaultContainer}
                menu={{ items, onClick: handleClick }}
                trigger={trigger ?? "click"}
                disabled={disabled}
            >
                <a onClick={(e) => e.preventDefault()} style={{ color: color && color}} {...props}>
                    <Space>
                        {icon && icon}
                        <span style={{whiteSpace: 'nowrap'}}>
                            {t(selectedItem?.label)}
                        </span>

                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </StyledDropdownSeparator>
    );
}