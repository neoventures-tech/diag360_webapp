import React, {useState} from 'react';
import {Typography} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import styled from 'styled-components';

import InputFormField from '@/components/data_entry/form/InputFormField.js';
import PasswordFormField
    from '@/components/data_entry/form/PasswordFormField.js';
import Button from '@/components/data_entry/Button.js';

import loginBg from '@/assets/images/login_bg.png';
import neosolvLogo from '@/assets/images/neosolv_logo.png';
import diagIcon from '@/assets/images/diag_icon.png';
import {useAuthContext} from "@/contexts/AuthContext.js";
import Form from "@/components/data_entry/form/Form.js";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/constants/PathRoutes.js";
import useBreakPoints from "@/hook/useBreakPoints.js";

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100%;
    background: linear-gradient(135deg, #e8d5f5 0%, #d4c4e3 30%, #c9b8d9 60%, #e0d0ec 100%);
    padding: 42px 24px;
    box-sizing: border-box;
    gap: 24px;
`;

const Card = styled.div`
    display: flex;
    background: #ffffff;
    border-radius: 29px;
    overflow: hidden;
    min-width: 400px;
    max-width: 1038px;
    width: 100%;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);

    //@media (max-width: 768px) {
    //    flex-direction: column;
    //    border-radius: 20px;
    //}
`;

const ImagePanel = styled.div`
    flex: 0 1 auto;
    max-width: 682px;
    height: 682px;
    border-radius: 28px 0 0 28px;
    overflow: hidden;
    position: relative;

    @media (max-width: 1100px) {
        width: 50%;
        height: auto;
        aspect-ratio: 1;
    }
    //
    //@media (max-width: 768px) {
    //    width: 100%;
    //    height: 300px;
    //    border-radius: 20px 20px 0 0;
    //}
`;

const BgImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;


const FormPanel = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 24px 40px;
    gap: 24px;
    flex-basis: 352px;
    flex-shrink: 0;
    //min-width: 352px;

    //@media (max-width: 768px) {
    //    padding: 24px;
    //}
`;


const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    width: 100%;
    max-width: 1060px;
    flex-wrap: wrap;
`;

const NeoSolvLogo = styled.img`
    height: 32px;
    object-fit: contain;
`;

const FooterRight = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const DiagIcon = styled.img`
    height: 24px;
    width: 23px;
    object-fit: contain;
`;

const FooterText = styled(Typography.Text)`
    &&& {
        font-size: 11px;
        font-weight: 500;
        color: #000000;
    }
`;

export default function LoginPage() {
    const {login} = useAuthContext()
    const [loading, setLoading] = useState(false);
    const {isMobile} = useBreakPoints()
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await login(values.email, values.password);
            // message.success('Login realizado com sucesso!');

        } catch (error) {
            // message.error(error.response?.data?.detail || 'Erro ao fazer login. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWrapper>

            <Card>
                {!isMobile &&  <ImagePanel>
                    <BgImage src={loginBg} alt="Login background"/>
                </ImagePanel>}

                <FormPanel>
                    <Form
                        form={form}
                        onFinish={onFinish}>
                        <InputFormField
                            form={{
                                name: 'email',
                                label: 'Email',
                                rules: [{
                                    required: true,
                                    message: 'Informe seu email'
                                }, {type: 'email', message: 'Email inválido'}],
                            }}
                            placeholder="example@email.com"
                            prefix={<UserOutlined/>}
                            size="middle"
                        />

                        <PasswordFormField
                            form={{
                                name: 'password',
                                label: 'Senha',
                                rules: [{
                                    required: true,
                                    message: 'Informe sua senha'
                                }],
                            }}
                            placeholder="********"
                            prefix={<LockOutlined/>}
                            size="middle"
                        />

                        <Form.Item>
                            <Button
                                htmlType="submit"
                                block
                                size="middle"
                                style={{borderRadius: 6}}
                            >
                                Acessar
                            </Button>
                        </Form.Item>
                    </Form>

                </FormPanel>
            </Card>

            <Footer>
                <NeoSolvLogo src={neosolvLogo} alt="NeoSolv"/>
                <FooterRight>
                    <DiagIcon src={diagIcon} alt="Diagnóstico"/>
                    <FooterText>Relatório de avaliação de Inovação</FooterText>
                </FooterRight>
            </Footer>
        </PageWrapper>
    );
}
