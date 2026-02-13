import React from "react";
import EasyCrop from "../EasyCrop/EasyCrop";
import styled from "styled-components";
import banner_default from "../../assets/imgs/1024x240.png";


const StyledBannerContainer = styled.div`
    min-width: 100%;
    height: ${({height}) => height || "400px"};
    overflow: hidden;
    position: relative;
    z-index: 1;
    border-radius: 8px;

    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    label {
        margin-left: 130px;
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: #f8f8f8;
        padding: 4px 8px;
    }
`

// OBS: usar o componente BannerUploaderNewVersion
export default function BannerUploader({
                                           img,
                                           imgDefault,
                                           ratio,
                                           onChange,
                                           objectFit,
                                           MAX_SIZE=2,
                                           styleProps
                                       }) {
    ratio = ratio || 1200 / 400
    return (
        <StyledBannerContainer
            data-cy="banner-uploader-container" {...styleProps}>
            <EasyCrop
                borderRadius={0}
                MAX_SIZE={MAX_SIZE}
                img={img ? img : imgDefault || banner_default}
                id='banner'
                onUploadImage={(file) => {
                    onChange?.(file)
                }}
                ratio={ratio}
                objectFit={objectFit}
            />
        </StyledBannerContainer>
    );
}
