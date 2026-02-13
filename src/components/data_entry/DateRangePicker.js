import {DatePicker} from "antd";
import {useTranslation} from "react-i18next";
import moment from "moment";
import dayjs from 'dayjs';
import {parseDate} from "../../utils/dates";
import styled from "styled-components";


const StyledRangePicker = styled(DatePicker.RangePicker)`
     input, .ant-picker-input, .ant-picker-input-active{
        width: ${({$width}) => `${$width}px` };
        overflow: hidden;
    }
`

export default function DateRangePicker({
                                            value, parseFormat = 'YYYY-MM-DD',
                                            onChange, inputWidth,
                                            ...props
                                        }) {

    const handleChange = (dates) => {
        const first_date = parseDate(dates?.[0], parseFormat);
        const second_date = parseDate(dates?.[1], parseFormat);
        onChange?.([first_date || '', second_date || '']);
    }


    const _value = value?.length > 0 && value[0] && value[1]? [dayjs(value?.[0] , parseFormat), dayjs(value?.[1], parseFormat)] : null

    return (<StyledRangePicker
            value={_value}
            format={'DD/MM/YYYY'}
            onChange={handleChange}
            $width={inputWidth}
            {...props}
        />
    )

}