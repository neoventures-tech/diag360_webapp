import {CloseCircleOutlined, InboxOutlined, UploadOutlined} from "@ant-design/icons";
import React, { useEffect, useRef } from "react";
import {Button, Modal, Upload, message} from "antd";
import api from "../../services/api";
import {useLayoutContext} from "../../context/LayoutContext";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {ACCEPT_ALL_FORMATS} from "../../utils/Constants";
import useFileUpload from "../../hooks/useFileUpload";

const {Dragger} = Upload;

const StyledDragger = styled(Dragger)`
    .ant-upload-drag-container{
      height: ${props => props.height ?? "initial"};
    }
`


const {confirm} = Modal;


function useAttachmentUpload({fileList, onChange, accept, removeAction, MAX_SIZE, MAX_TOTAL_SIZE}) {
    const {openNotification} = useLayoutContext();
    const { t } = useTranslation();

     const handleChange = ({fileList}) => {
        const convertedFiles = fileList.map((file) => {
            if (file.hasOwnProperty("originFileObj")) {
                return file.originFileObj;
            }
            return file;
        });
        onChange && onChange(convertedFiles);
    };

     const handleBeforeUpload = (file) => {
        const validSize = file.size / 1024 / 1024 <= MAX_SIZE;
        if (!accept?.includes(file.type)) {
            message.error(t("Invalid file type(s)"))
            return Upload.LIST_IGNORE;
        }
        if (!validSize) {
            openNotification({type: "error", message: `File size limit is: ${MAX_SIZE}MB`})
            return Upload.LIST_IGNORE;
        }
        if(MAX_TOTAL_SIZE){
            const totalSize = fileList.reduce((acc, value) => (acc + value.size), 0) / 1024 / 1024
            if ((totalSize + validSize) > MAX_TOTAL_SIZE){
                openNotification({type: "error", message: `${t("The total file size cannot exceed")} ${MAX_TOTAL_SIZE}MB.`})
                return Upload.LIST_IGNORE;
            }
        }
        return false;
    }

    const defaultRemoveAction = (file) => {
        try {
            api.delete(`files/${file.id}`);
            onChange(fileList.filter((fileKeep) => fileKeep.id !== file.id));
        } catch (error) {}
    }

    const confirmDelete = (callback) => {
        confirm({
            title: t("Do you really want to delete this file?"),
            icon: <CloseCircleOutlined style={{color: "red"}}/>,
            okText: t("Yes"),
            okType: "danger",
            cancelText: t("No"),
            onOk: () => {
                callback();
            },
        });
    }

    const handleRemove = async (file) => {
        if (removeAction) {
            confirmDelete(() => removeAction(file))
            return false;
        } else if (file.id !== undefined) {
            confirmDelete(() => defaultRemoveAction(file))
            return false;
        }
        return true;
    };
    return {handleChange, handleRemove, handleBeforeUpload};
}


export function AttachmentUploader({children, fileList, onChange, MAX_SIZE=10, removeAction, accept=ACCEPT_ALL_FORMATS, dataCy, ...props}){
    const {handleChange, handleRemove, handleBeforeUpload} = useAttachmentUpload({fileList, onChange, accept,MAX_SIZE});
    const { t } = useTranslation();



    return (
        <Upload
            fileList={fileList}
            beforeUpload={handleBeforeUpload}
            onChange={handleChange}
            onRemove={handleRemove}
            accept={accept}
            data-cy={dataCy}
            {...props}
        >
            {children || <Button icon={<UploadOutlined />}>{t("Select File")}</Button>}
        </Upload>
    )
}

export function AttachmentDraggerUploader({fileList, onChange, height, description, removeAction, MAX_SIZE=10, accept=ACCEPT_ALL_FORMATS, MAX_TOTAL_SIZE, ...props}) {
    const { t } = useTranslation();
    const {handleChange, handleRemove, handleBeforeUpload} = useAttachmentUpload({fileList, onChange, accept, MAX_SIZE, removeAction, MAX_TOTAL_SIZE});
    description = description ?? t("Support for a single or bulk upload.")


    return (
        <StyledDragger
            fileList={fileList}
            beforeUpload={handleBeforeUpload}
            onChange={handleChange}
            onRemove={handleRemove}
            accept={accept}
            height={height}
            data-cy="attachment-dragger-upload"
            {...props}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined/>
            </p>
            <p className="ant-upload-text">{t("Click or drag file to this area to upload")}</p>
            <p className="ant-upload-hint">
                {description}
            </p>
        </StyledDragger>
    );
}

export function AttachmentDraggerNewUploader({fileList, onChange, height, description, removeAction, MAX_SIZE=10, accept=ACCEPT_ALL_FORMATS, MAX_TOTAL_SIZE, ...props}) {
    const { t } = useTranslation();
    description = description ?? t("Support for a single or bulk upload.")
    const fileProps = useFileUpload({accept: accept,externalOnChange: onChange, MAX_SIZE:MAX_SIZE, MAX_TOTAL_SIZE:MAX_TOTAL_SIZE})


    return (
        <StyledDragger
            {...fileProps}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined/>
            </p>
            <p className="ant-upload-text">{t("Click or drag file to this area to upload")}</p>
            <p className="ant-upload-hint">
                {description}
            </p>
        </StyledDragger>
    );
}