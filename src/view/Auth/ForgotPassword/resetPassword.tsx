import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { useSingleAsync } from '@hook/useAsync';
import authenticationPresenter from '@modules/authentication/presenter';
import { useAltaIntl } from '@shared/hook/useTranslate';

import NavLinkBottom from '../components/NavLinkBottom';
import RenderError from '../components/RenderError';

const ForgotPassword = () => {
    const history = useNavigate();
    const { formatMessage } = useAltaIntl();
    const { forgotPass } = authenticationPresenter;
    const forgotPasswordCall = useSingleAsync(forgotPass);
    const [errorStatus, setErrorStatus] = useState('');
    const [checkSuccessEmail, setCheckSuccessEmail] = useState<boolean>(false);

    const onFinishFailed = () => {
        setErrorStatus('');
    };

    const onSubmitEmail = (values: any) => {
        // forgotPasswordCall
        //   ?.execute(values)
        //   .then(() => {
        //     setCheckSuccessEmail(true);
        //   })
        //   .catch(() => {
        //     setErrorStatus(formatMessage('forgot.password.email.not.exit'));
        //   });
    };

    return (
        <>
            <div className="input-form">
                <p className="main-title">{formatMessage('forgot.password.title.reset')}</p>
                <Form
                    name="forgotPassword"
                    layout="vertical"
                    onFinish={onSubmitEmail}
                    onFinishFailed={onFinishFailed}
                    requiredMark={false}
                >
                    <Form.Item
                        label={formatMessage('auth.password')}
                        name="password"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder={formatMessage('auth.password')}
                            status={errorStatus !== '' ? "error" : ""}
                        />
                    </Form.Item>
                    <Form.Item
                        label={formatMessage('auth.password')}
                        name="password"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder={formatMessage('auth.password.confirm')}
                            status={errorStatus !== '' ? "error" : ""}
                        />
                    </Form.Item>
                    {errorStatus && <RenderError errorStatus={errorStatus} />}
                    <br />
                    <br />
                    <Form.Item className='form-item-multi-button'>
                        <Button htmlType="submit" className="normal-button">
                            {formatMessage('forgot.password.button.accept')}
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </>
    );
};
export default ForgotPassword;
