import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { useSingleAsync } from '@hook/useAsync';
import authenticationPresenter from '@modules/authentication/presenter';
import { useAltaIntl } from '@shared/hook/useTranslate';

import NavLinkBottom from '../components/NavLinkBottom';
import RenderError from '../components/RenderError';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { emailNeedChangePassword } from '@modules/resetpassword/ResetPasswordStore';
import { FirebaseConfig } from 'src/firebase/configs';
import { sendPasswordResetEmail } from 'firebase/auth';
const ForgotPassword = () => {
  const history = useNavigate();
  const auth = FirebaseConfig.getInstance().auth
  const dispatch = useAppDispatch()
  const { formatMessage } = useAltaIntl();
  const { forgotPass } = authenticationPresenter;
  const forgotPasswordCall = useSingleAsync(forgotPass);
  const [errorStatus, setErrorStatus] = useState('');
  const [email, setEmail] = useState('')
  const [checkSuccessEmail, setCheckSuccessEmail] = useState<boolean>(false);
  const test = useAppSelector(state => state.resetpassword.email)
  const onFinishFailed = () => {
    setErrorStatus('');
  };

  const handleSubmit = async () => {
    await sendPasswordResetEmail(auth, email);
  };

  const cancle = () => {
    history("/login")
  }

  return (
    <>
      <div className="main-form auth-form">
        {!checkSuccessEmail ? (
          <>
            <div className="content-form">
              <img className="logo-alta-form" src={require('../../../shared/assets/svg/Logo_alta.svg')}></img>
              <div className="input-form">
                <p className="main-title">{formatMessage('forgot.password.title')}</p>
                <Form
                  name="forgotPassword"
                  layout="vertical"
                  // onFinish={onSubmitEmail}
                  onFinishFailed={onFinishFailed}
                  requiredMark={false}
                >
                  <Form.Item
                    label={formatMessage('forgot.password.description')}
                    name="email"
                    rules={[
                      {
                        required: true,
                      },
                      {
                        type: 'email',
                      },
                    ]}
                  >
                    <Input placeholder="david@gmail.com" onChange={(event) => setEmail(event.target.value)} />
                  </Form.Item>
                  {errorStatus && <RenderError errorStatus={errorStatus} />}
                  <br />
                  <br />
                  <Form.Item className='form-item-multi-button'>
                    <Button onClick={() => cancle()} className="cancel-button">
                      {formatMessage('forgot.password.button.cancel')}
                    </Button>
                    <Button htmlType="submit" className="normal-button" onClick={handleSubmit}>
                      {formatMessage('forgot.password.button.next')}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </>
        ) : (
          <div className="status__box">
            <p>{formatMessage('forgot.password.notification')}</p>
          </div>
        )}
        <div className='thumnail-login'>
          <img className="thumnail-login-image" src={require('../../../shared/assets/svg/Thumnail_reset_password.svg')}></img>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
