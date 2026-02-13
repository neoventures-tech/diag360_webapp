import React, {useEffect, useState} from 'react';
import Autocomplete from 'react-google-autocomplete';
import {REACT_APP_GOOGLE_API_KEY} from "../../settings";
import {useTranslation} from "react-i18next";
import { getLanguage } from '../../utils/translation';
import styled from "styled-components";
import {neutral_5} from "../../utils/Colors";
// import {REACT_APP_GOOGLE_API_KEY} from "../../confis/env_files/env_local";


const StyledAddressInput = styled(Autocomplete)`
    width: 100%;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    border-radius: 6px;
    transition: all 0.2s;
    background: #ffffff;
    border-width: 1px;
    border-style: solid;
    border-color:${({$invalid}) => $invalid ? "#ff4d4f" : neutral_5 };
    outline: 0;
    
    &:hover {
        border-color:${({$invalid}) => $invalid ? "#ff4d4f77" : "var(--primary_btn_color)"};
    }
    
    &:focus, &:active {
        border-color:${({$invalid}) => $invalid ? "#ff4d4f" : "var(--primary_btn_color)"};
    }
    
     
`


export default function SearchAddressInput({value, onChange, ...props}) {
    
    const {t} = useTranslation()
    const [address, setAddress] = useState({
        city: '',
        state: '',
        country: '',
        lat: undefined,
        long: undefined,
    })

    const ariaInvalid = props["aria-invalid"]

    const handleChange = (place) => {
        const {address_components: addressData} = place;
        if (!addressData) return;

        const city = addressData.find((item) => item.types.includes('locality'))?.long_name || ""
        const state = addressData.find((item) => item.types.includes('administrative_area_level_1'))?.long_name || ""
        const country = addressData.find((item) => item.types.includes('country'))?.long_name || ""
        const lat = place['geometry']['location'].lat()
        const long = place['geometry']['location'].lng()
        const newAddress = {city, state, country, lat, long};
        setAddress(newAddress);
        onChange(newAddress);
    }


    useEffect(() => {
        setAddress({
            city: value?.city || '', 
            state: value?.state || '', 
            country: value?.country || '', 
            lat: value?.lat || undefined,
            long: value?.long || undefined,
        });
    }, [value]);

    const getDefaultValue = () => {
        return address.city ? `${address.city}, ${address.state}, ${address.country}`: ''
    }

    return (
        <StyledAddressInput
            // className={ariaInvalid ? "ant-input ant-input-status-error" : "ant-input"}
            $invalid={ariaInvalid}
            defaultValue={getDefaultValue()}
            apiKey={REACT_APP_GOOGLE_API_KEY}
            placeholder={t("Search for a place")}
            onPlaceSelected={handleChange}
            options={{
                types: ["(cities)"],
            }}
            language={getLanguage()}
            data-cy="address-input"
        />
    );
}

