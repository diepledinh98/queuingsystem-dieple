import React from "react";
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FirebaseConfig } from "src/firebase/configs";
import { useSingleAsync } from '@hook/useAsync';
import authenticationPresenter from '@modules/authentication/presenter';
import { useAltaIntl } from '@shared/hook/useTranslate';
import { useAppDispatch, useAppSelector } from "@shared/hook/reduxhook";
import RenderError from '../components/RenderError';
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { emailNeedChangePassword } from "@modules/resetpassword/ResetPasswordStore";
const NewPassWord = () => {
    const auth = FirebaseConfig.getInstance().auth
    const email = useAppSelector(state => state.resetpassword.email)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const emailneedchange = useAppSelector(state => state.resetpassword.email)
    const { formatMessage } = useAltaIntl();
    const [newPassword, setNewPassword] = useState('')
    const [errorStatus, setErrorStatus] = useState('');
    const user = auth.currentUser;
    console.log(email);

    const onSubmitAccount = () => {
        auth.sendPasswordResetEmail(email)
            .then(() => {
                alert('ok')
            })
            .catch((err) => {

            })
        // await updatePassword(email, newPassword)
        // dispatch(emailNeedChangePassword(''))
        navigate('/login')
    }
    return (
        <div className="main-form auth-form">
            <div className="content-form">
                <img className="logo-alta-form" src={require('../../../shared/assets/svg/Logo_alta.svg')}></img>
                <div className="input-form" style={{ marginTop: 102 }}>
                    <p className="main-title" >Đặt lại mật khẩu mới</p>
                    <Form
                        name="loginByAccount"
                        layout="vertical"
                        onFinish={onSubmitAccount}
                        //   onFinishFailed={onFinishFailed}
                        requiredMark={false}
                        initialValues={{
                            remember: false,
                        }}
                    >
                        <Form.Item
                            label={formatMessage('common.password')}
                            name="accountPassword"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                placeholder={formatMessage('common.password')}
                                status={errorStatus !== '' ? "error" : ""}
                                onChange={(event => setNewPassword(event.target.value))}
                            />
                        </Form.Item>
                        <Form.Item
                            label={formatMessage('common.renewpassword')}
                            name="newpassword"
                            rules={[
                                {
                                    required: true,
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, passwordConfirm) {
                                        if (!passwordConfirm || getFieldValue('accountPassword') === passwordConfirm) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(formatMessage('auth.password.not.match')));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                placeholder={formatMessage('common.renewpassword')}
                                status={errorStatus !== '' ? "error" : ""}
                            />
                        </Form.Item>

                        {errorStatus && <RenderError errorStatus={errorStatus} />}
                        <br />
                        <br />
                        <Button htmlType="submit" className="">
                            {formatMessage('common.button.accept')}
                        </Button>
                        {errorStatus !== '' && <Link to={"/forgot-password"} className="forgot-password" style={{ textAlign: "center" }}>Quên mật khẩu?</Link>}
                    </Form>
                </div>
            </div>
            <div className='thumnail-login'>
                <img className="thumnail-login-image" src={require('../../../shared/assets/svg/Thumnail_login_logo.svg')}></img>
                <p className='thumnail-login-content'>Hệ thống <br />
                    <strong style={{
                        fontSize: '36px',
                        fontWeight: '900'
                    }}
                    >QUẢN LÍ XẾP HÀNG</strong>
                </p>
            </div>
        </div>
    )
}

export default NewPassWord