import React, {useState} from 'react'
import {CardContainer} from "../misc/CardContainer";
import {Col, Form as FormAnt, Popconfirm, Row, Typography} from "antd";
import Search from "antd/es/input/Search";
import {PlusOutlined} from "@ant-design/icons";
import Table from "../data_display/Table";
import {useTranslation} from "react-i18next";
import useTable from "../../hooks/useTable";
import Button from "./Button";
import Form from "./form/Form";
import WideSpace from "../layout/WideSpace";
import Drawer from "../layout/Drawer";
import {FlexContainer} from "../StyledComponents";
import {convertToFormData} from "../../utils/utils_2";
import api from "../../services/api";
import {ToastNotification} from "../feedback/ToastNotification";
import {AttachmentDraggerUploader} from "./AttachmentUploader";
import {renderDate, renderFileType} from "../tables/utils";
import InputField from "./InputField";

const {Title} = Typography;

export default function FilesTable({
                                       fileType,
                                       id,
                                       hasPermission = true,
                                       table = {},
                                       cardStyle
                                   }) {

    const [showNewAttachmentDrawer, setShowNewAttachmentDrawer] = useState(false)
    const {t} = useTranslation();
    const [form] = FormAnt.useForm()
    const [search, setSearch] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const {
        tableData, tableParams, resetTable, isLoading, handleTableChange
    } = useTable({
        url: table?.request?.url_get || `/file_upload/content/${fileType}/object/${id}/list_uploads/`,
        waitExternalLoading: !!!id,
        hasPagination: true,
        search,
        pageSize: 5
    })

    const handleAttachmentSubmit = async (data) => {
        try {
            setIsUploading(true);
            const formData = convertToFormData({
                ...data,
                path: data.path[0]
            });
            await api.post(`/file_upload/content/${fileType}/object/${id}/upload/`, formData);
            form.resetFields();
            setShowNewAttachmentDrawer(false);
            resetTable();

            ToastNotification(t("File(s) uploaded successfully"))
        } catch (error) {
            ToastNotification(t("File(s) couldn't be uploaded"), "erro");
        } finally {
            setIsUploading(false);
        }
    }

    const handleAttachmentDelete = async (record) => {
        try {

            await api.delete(`/file_upload/content/${record.id}`);
            resetTable();
            ToastNotification(t("File(s) deleted successfully"));
        } catch (error) {
            ToastNotification(t("File(s) couldn't be deleted"), 'erro');
        }
    }

    function getColumns() {
        if (table.columns) return table.columns
        const extraColumns = table.extraColumns ? table.extraColumns : []
        return [{
            title: t("Type"),
            dataIndex: "path",
            render: renderFileType
        },
            {
                title: t("File"),
                dataIndex: "name",
                render: (value, record) => <a href={record.path}
                                              target={"_blank"}>{value}</a>
            },
            {
                title: t("Date"),
                dataIndex: 'created_at',
                render: renderDate
            }, ...extraColumns, {
                title: t("Action"),
                key: 'action',
                render: (_, record) => (
                    <>
                        {hasPermission && <Popconfirm
                            title={t("Do you really want to delete this file?")}
                            onConfirm={() => handleAttachmentDelete(record)}
                            okText={t("Yes")}
                            cancelText={t("No")}
                        >
                            <Button type="link">{t("Delete")}</Button>
                        </Popconfirm>}
                    </>
                ),
            }]
    }

    return (
        <>
            <CardContainer bordered={false} style={cardStyle}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={12}>
                        <Title level={5}>{t("Inserted attachments")}</Title>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Row gutter={16}>
                            <Col flex={'1'}>
                                <Search onSearch={(value) => setSearch(value)}
                                        allowClear/>
                            </Col>
                            {hasPermission && <Col>
                                <Button
                                    data-cy="new-file-button"
                                    icon={<PlusOutlined/>}
                                    onClick={() => setShowNewAttachmentDrawer(true)}> {t("New File")}
                                </Button>
                            </Col>}
                        </Row>

                    </Col>
                    <Col xs={24}>
                        <Table dataSource={tableData}
                               onChange={handleTableChange}
                               isLoading={isLoading}
                               tableParams={tableParams} {...table}
                               columns={getColumns()}/>
                    </Col>
                </Row>


            </CardContainer>
            <Drawer title={t("Insert new attachment")}
                    open={showNewAttachmentDrawer}
                    setOpen={setShowNewAttachmentDrawer}
                    footer={
                        <FlexContainer justify="end"><Button
                            data-cy="submit-file-button"
                            onClick={form.submit}
                            loading={isUploading}>{t("Insert")}</Button></FlexContainer>
                    }
            >
                <WideSpace direction="vertical" size="middle"
                           style={{height: "100%"}}>
                    <Form form={form}
                          onFinish={handleAttachmentSubmit}
                          disabled={isUploading}>
                        <FormAnt.Item
                            label={t("Upload your file here")}
                            help={`${t("Maximum size")} (10MB) ${t("File type(s)")}: PDF`}
                            name="path"
                            valuePropName={"fileList"}
                            rules={[{required: true}]}
                        >
                            <AttachmentDraggerUploader
                                height={300}
                                accept={["application/pdf"]}
                                maxCount={1}
                                description={`${t("Supported file size limit up to a maximum of")} 10 MB`}
                            />
                        </FormAnt.Item>

                        <FormAnt.Item name="name" label={`${t("File name")}`} rules={[{required: true}]}>
                            <InputField data-cy="file-name-input"/>
                        </FormAnt.Item>
                    </Form>
                </WideSpace>
            </Drawer>
        </>
    )
}