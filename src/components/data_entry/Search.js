import {Input, Popover, Button} from "antd";
import {SearchOutlined} from "@ant-design/icons";

export default function Search({width=250, popover = false, popoverProps = {}, ...props}) {
    const searchInput = (
        <Input.Search
            style={{width}}
            allowClear
            {...props}
        />
    );

    if (popover) {
        return (
            <Popover
                trigger="click"
                content={searchInput}
                {...popoverProps}
            >
                <Button icon={<SearchOutlined/>} {...props}/>
            </Popover>
        );
    }

    return searchInput;
}