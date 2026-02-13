import React from 'react';
import {Typography} from 'antd';
import styled from 'styled-components';
import {CheckOutlined, CloseCircleOutlined} from '@ant-design/icons';

const {Text} = Typography;

const StyledPasswordCheckList = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;

    .ant-list-item-meta {
        display: flex;
        align-items: center;
    }

    .ant-list-item-meta-description {
        margin-left: 8px;
        padding-left: 4px;
    }
`;

export default function PasswordValidation({
                                               newPassword,
                                               confirmPassword,
                                               t,
                                               ...props
                                           }) {
    const isFieldFilled = (field) => field !== '';

    const isLengthValid = isFieldFilled(newPassword) && newPassword?.length >= 8;
    const hasSpecialChar = isFieldFilled(newPassword) && /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const hasNumber = isFieldFilled(newPassword) && /\d/.test(newPassword);
    const hasCapital = isFieldFilled(newPassword) && /[A-Z]/.test(newPassword);
    // const hasLowercase = isFieldFilled(newPassword) && /[a-z]/.test(newPassword); TO DO não tem validação backend
    const isConfirmationValid = isFieldFilled(newPassword) && isFieldFilled(confirmPassword) && newPassword === confirmPassword;

    const isValid =
        isLengthValid && hasSpecialChar && hasNumber && hasCapital && isConfirmationValid;
    props?.onChange?.(isValid)
    return (
        <StyledPasswordCheckList isValid={isValid}>
            {[
                {
                    rule: 'minLength',
                    message: t('Password has more than 8 characters.'),
                    isValid: isLengthValid
                },
                {
                    rule: 'specialChar',
                    message: t('Password has special characters.'),
                    isValid: hasSpecialChar
                },
                {
                    rule: 'number',
                    message: t('Password has a number.'),
                    isValid: hasNumber
                },
                {
                    rule: 'capital',
                    message: t('Password has a capital letter.'),
                    isValid: hasCapital
                },
                // { rule: 'lowercase', message: t('Password has a lowercase letter.'), isValid: hasLowercase }, TO DO não tem validação backend
                {
                    rule: 'match',
                    message: t('Passwords match.'),
                    isValid: isConfirmationValid
                },
            ].map((item) => (
                <div key={item.rule} className="ant-list-item-meta">
                    {item.isValid ? (
                        <CheckOutlined
                            type={item.isValid ? 'primary' : 'secondary'}/>
                    ) : (
                        <CloseCircleOutlined
                            style={{color: 'rgba(0, 0, 0, 0.45)'}}/>
                    )}
                    <Text type={item.isValid ? 'primary' : 'secondary'}
                          className="ant-list-item-meta-description">
                        {item.message}
                    </Text>
                </div>
            ))}
        </StyledPasswordCheckList>
    );
}