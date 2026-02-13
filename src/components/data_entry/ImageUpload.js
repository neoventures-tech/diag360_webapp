import React, {useEffect, useState} from "react";
import styled from "styled-components";
import useFileUpload from "../../hooks/useFileUpload";
import ImgCrop from "antd-img-crop"
import {useTranslation} from "react-i18next";
import {Spin, Upload} from "antd";
import { ACCEPT_IMAGE_FORMATS } from "../../utils/Constants";
import ImagePreview from "../../assets/imgs/upload_challenge.png"

const StyledBannerContainer = styled.div`
    min-width: 100%;
    height: ${({height}) => height || "100%"};
    position: relative;
    z-index: 1;

    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

`

const AspectContainer = styled.div`
    font-size: 44px;
    display: grid;
    place-content: center;
    color: white;
    background-color: #222;
    height: 100%;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const StyledUpload = styled(Upload)`
    .ant-upload-select {
        display: block;   
    }
`;

const Container = styled.div`
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
`;


//OBS: Componente ainda necessita melhorias
export default function ImageUpload({
                                                    fileList,
                                                    imgDefault,
                                                    aspect=[4, 3],
                                                    width='100%', 
                                                    height=300,
                                                    onChange,
                                                    styleProps,
                                                    accept=ACCEPT_IMAGE_FORMATS,
                                                    MAX_SIZE,
                                                    MAX_TOTAL_SIZE
                                                 }) {
    const ratio = aspect ? aspect[0] / aspect[1] : 1920 / 840

    const [preview, setPreview] = useState({img: null, name: null})
    const {t} = useTranslation()
    const fileProps = useFileUpload({
        accept: accept,
        externalOnChange: onChange,
        MAX_SIZE: MAX_SIZE,
        MAX_TOTAL_SIZE: MAX_TOTAL_SIZE
    })

    function convert_blob_to_base64(file) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            // convert image file to base64 string
            setPreview({img: reader.result, name: file.name})
        }, false);
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        if (fileList instanceof Array) { 
            const item = fileList.at(-1);
            if (item) {
                if (item.file) { 
                    convert_blob_to_base64(item.file)
                } else if (item.url) {
                    setPreview({img: item.url})
                }
            }
        } else if (fileList) {
            setPreview({img: fileList})
        }
    }, [fileList]);
    return (
        <StyledBannerContainer {...styleProps}>
            <ImgCrop aspect={ratio} modalTitle={t('Add new image')}>
                    <StyledUpload maxCount={1} showUploadList={false} {...fileProps}>
                        <Spin spinning={fileProps.isUploading}>
                            <Container style={{width, height}}>
                                {preview?.img ?
                                    <Image src={preview?.img}/>:
                                    // <AspectContainer>
                                        <img src={ImagePreview}/>
                                    // </AspectContainer>
                                }
                            </Container>
                        </Spin>
                    </StyledUpload>
            </ImgCrop>
        </StyledBannerContainer>
    );
}
