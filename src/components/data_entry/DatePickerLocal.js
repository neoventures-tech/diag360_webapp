import {DatePicker} from "antd";
import {useTranslation} from "react-i18next";
import dayjs from 'dayjs';


export default function DatePickerLocal({ value, style, onChange, showTime = false, useFirtsOnChange = true, ...props }) {

    const { t } = useTranslation();
    const parseFormat = showTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD';
    const VIEW_FORMAT = showTime ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY';

    const getMomentDate = (date) => {
        return date ? dayjs(date) : null;
    }

    value = getMomentDate(value);

    const handleChange = (date) => {
        const formattedDate = getMomentDate(date)?.format(parseFormat);
        onChange && onChange(formattedDate);
    }

    return <>
        <DatePicker
            value={value}
            placeholder={t("Select date")}
            format={VIEW_FORMAT}
            style={style}
            onChange={handleChange}
            showTime={showTime}
            {...props}
        />
    </>;
}