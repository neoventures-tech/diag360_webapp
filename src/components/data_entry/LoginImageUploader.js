import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Button, Upload, Modal, Typography, Flex, Slider } from "antd";
import { UploadOutlined, ZoomInOutlined } from "@ant-design/icons";
import Cropper from 'react-easy-crop';
import { getOrientation } from "get-orientation/browser";
import { getCroppedImg, getRotatedImage } from "../EasyCrop/canvasUtils";
import { FileValidate, limit_image } from "../../utils/FileValidate";
import { ToastNotification } from "../feedback/ToastNotification";
import UploadIcon from "../../assets/imgs/upload.svg";

const ORIENTATION_TO_ANGLE = {
    3: 180,
    6: 90,
    8: -90,
};

const Limit = styled.span`
    font-size: 10px;
`;

// Converte blob URL para File object
async function blobUrlToFile(blobUrl, fileName = 'cropped-image.jpg') {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
}

export default function LoginImageUploader({
    value,
    onChange,
    MAX_SIZE = 3,
}) {
    // Proporção aproximada da área de imagem da tela de login (60% de 1024px / 682px ≈ 0.9)
    // Usando 9:10 para melhor representação
    const ratio = 9 / 10;
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [newImage, setNewImage] = useState("");
    const [imageQuality, setImageQuality] = useState(0.8);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [fileList, setFileList] = useState([]);

    // Sincroniza fileList com value do form
    useEffect(() => {
        if (Array.isArray(value) && value.length > 0) {
            const formattedList = value.map((file, index) => ({
                uid: file.uid || `-${index}`,
                name: file.name || 'login-image.jpg',
                status: 'done',
                url: file.path || (file instanceof File ? URL.createObjectURL(file) : file.url),
                originFileObj: file instanceof File ? file : undefined,
            }));
            setFileList(formattedList);
        } else {
            setFileList([]);
        }
    }, [value]);

    function readFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => resolve(reader.result), false);
            reader.readAsDataURL(file);
        });
    }

    async function onFileChange(file) {
        const validSize = file.size / 1024 / 1024 <= MAX_SIZE;
        if (!validSize) {
            ToastNotification(t(`File size limit is: {{size}}MB`, { size: MAX_SIZE }), 'error');
            return false;
        }
        if (!FileValidate(file, "image")) {
            ToastNotification(t("Invalid file type"), "warning");
            return false;
        }

        let imageDataUrl = await readFile(file);

        // Aplicar rotação se necessário
        const orientation = await getOrientation(file);
        const rotation = ORIENTATION_TO_ANGLE[orientation];
        if (rotation) {
            imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
        }

        // Ajustar qualidade baseado no tamanho
        const fileSizeMB = file.size / 1024 / 1024;
        if (fileSizeMB < 0.5) {
            setImageQuality(1);
        } else if (fileSizeMB < 1) {
            setImageQuality(0.95);
        } else {
            setImageQuality(0.9);
        }

        setNewImage(imageDataUrl);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
        setOpen(true);
        return false; // Previne upload automático
    }

    function onCropComplete(croppedArea, croppedAreaPixels) {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    async function handleOk() {
        try {
            const croppedImageUrl = await getCroppedImg(newImage, croppedAreaPixels, 0, imageQuality);
            const file = await blobUrlToFile(croppedImageUrl, 'login-image.jpg');

            // Retorna array com o File object
            const fileArray = [file];
            onChange?.(fileArray);

            setOpen(false);
            setNewImage("");
            setZoom(1);
            setCrop({ x: 0, y: 0 });
            setRotation(0);
        } catch (error) {
            console.error('Error cropping image:', error);
            ToastNotification(t("Error processing image"), 'error');
        }
    }

    function handleCancel() {
        setOpen(false);
        setNewImage("");
        setZoom(1);
        setCrop({ x: 0, y: 0 });
        setRotation(0);
    }

    function handleRemove() {
        onChange?.([]);
        setFileList([]);
    }

    return (
        <>
            <Upload
                fileList={fileList}
                beforeUpload={onFileChange}
                onRemove={handleRemove}
                accept="image/*"
                maxCount={1}
                data-cy="login-image-uploader"
            >
                <Button icon={<UploadOutlined />}>{t("Click to Upload")}</Button>
            </Upload>

            <Modal
                open={open}
                onCancel={handleCancel}
                title={<Typography.Title level={4}>{t("Crop Image")}</Typography.Title>}
                footer={
                    <Flex justify="end" gap={16}>
                        <Button type="default" onClick={handleCancel}>
                            {t("Cancel")}
                        </Button>
                        <Button type="primary" onClick={handleOk}>
                            {t("OK")}
                        </Button>
                    </Flex>
                }
                width={700}
            >
                <div style={{ marginBottom: 16 }}>
                    <div style={{ height: "450px", position: 'relative' }}>
                        {newImage ? (
                            <Cropper
                                image={newImage}
                                crop={crop}
                                zoom={zoom}
                                rotation={rotation}
                                aspect={ratio}
                                objectFit="contain"
                                cropShape="rect"
                                showGrid={true}
                                zoomSpeed={0.5}
                                restrictPosition={false}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onRotationChange={setRotation}
                                onCropComplete={onCropComplete}
                            />
                        ) : (
                            <div className="divModalImageCrop">
                                <img alt="icon" src={UploadIcon} width="250" />
                                <span
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 500,
                                        color: "var(--primary_btn_color)",
                                    }}
                                >
                                    {t("Click here to upload your image")}
                                </span>
                                <Limit>
                                    {`(${t('Max upload')} - ${MAX_SIZE} MB)`}
                                </Limit>
                            </div>
                        )}
                    </div>
                    {newImage && (
                        <div style={{ marginTop: 16 }}>
                            <Typography.Text strong>
                                <ZoomInOutlined style={{ marginRight: 8 }} />
                                {t("Zoom")}
                            </Typography.Text>
                            <Slider
                                min={0.5}
                                max={3}
                                step={0.01}
                                value={zoom}
                                onChange={setZoom}
                                tooltip={{ formatter: (value) => `${Math.round(value * 100)}%` }}
                            />
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
}
