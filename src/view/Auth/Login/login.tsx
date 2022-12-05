import { Button, Checkbox, Form, Input } from 'antd';
import '../styles.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { useSingleAsync } from '@hook/useAsync';
import { useAltaIntl } from '@hook/useTranslate';
import authenticationPresenter from '@modules/authentication/presenter';

import RenderError from '../components/RenderError';
import { Link } from 'react-router-dom';


const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { formatMessage } = useAltaIntl();
    const { login } = authenticationPresenter;
    const loginByAccount = useSingleAsync(login);
    const [errorStatus, setErrorStatus] = useState('');
    const onFinishFailed = () => {
        setErrorStatus('');
    };
    const onSubmitAccount = (values: any) => {
        delete values.remember;
        document.cookie = `remember_me=${true}; SameSite=None; Secure`;
        loginByAccount
            ?.execute(values)
            ?.then(() => {
                setErrorStatus('');
                setTimeout(() => {
                    navigate('/');
                }, 300);
            })
            .catch(() => {
                setErrorStatus(formatMessage('login.account.error'));
            });
    };


    return (
        <>
            <div className="main-form auth-form">
                <div className="content-form">
                    <img className="logo-alta-form" src={require('../../../shared/assets/svg/Logo_alta.svg')}></img>
                    <div className="input-form">
                        <Form
                            name="loginByAccount"
                            layout="vertical"
                            onFinish={onSubmitAccount}
                            onFinishFailed={onFinishFailed}
                            requiredMark={false}
                            initialValues={{
                                remember: false,
                            }}
                        >
                            <Form.Item
                                label={formatMessage('auth.email')}
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={formatMessage('auth.email')}
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
                                    placeholder={formatMessage('auth.password')}
                                    status={errorStatus !== '' ? "error" : ""}
                                />
                            </Form.Item>
                            {errorStatus === '' && <Link to={""} className="forgot-password" >Quên mật khẩu?</Link>}
                            {errorStatus && <RenderError errorStatus={errorStatus} />}
                            <Button htmlType="submit" className="" style={{ width: 100 }}>
                                {formatMessage('login.button.account')}
                            </Button>
                            {errorStatus !== '' && <Link to={""} className="forgot-password" style={{ textAlign: "center" }}>Quên mật khẩu?</Link>}
                        </Form>
                    </div>
                </div>
                <div className='thumnail-login'>
                    <img className="thumnail-login-image" src={require('../../../shared/assets/svg/Thumnail_login_logo.svg')}></img>
                    <p className='thumnail-login-content'>Hệ thống <br />
                        <strong>QUẢN LÍ XẾP HÀNG</strong>
                    </p>
                </div>
            </div>
        </>
    )
}

export default LoginPage