import { Upload } from "antd";
import React, { useEffect, useState } from "react";
import useFileUpload from "../../hooks/useFileUpload";
import api from "../../services/api";
import { ACCEPT_PDF_FORMAT } from "../../utils/Constants";
import styled from "styled-components";


const StyledUpload = styled(Upload)`
    .ant-upload-list-item-container {
        max-width: 200px;
    }
`;
//OBS: Componente ainda necessita melhorias
export default function FileUpload({
    children,
    fileList,
    onChange,
    showUploadFileList=true,
    maxCount=1,
    accept = ACCEPT_PDF_FORMAT,
    MAX_SIZE,
    MAX_TOTAL_SIZE
}) {
    const fileProps = useFileUpload({
        accept: accept,
        externalOnChange: onChange,
        MAX_SIZE: MAX_SIZE,
        MAX_TOTAL_SIZE: MAX_TOTAL_SIZE
    })
    return (
        <StyledUpload maxCount={maxCount} showUploadList={showUploadFileList} {...fileProps} fileList={fileList}>
            {children}
        </StyledUpload>
    );
}
