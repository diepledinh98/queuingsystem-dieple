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
    forgotPasswordCall
      ?.execute(values)
      .then(() => {
        setCheckSuccessEmail(true);
      })
      .catch(() => {
        setErrorStatus(formatMessage('forgot.password.email.not.exit'));
      });
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
                  onFinish={onSubmitEmail}
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
                    <Input placeholder="david@gmail.com" />
                  </Form.Item>
                  {errorStatus && <RenderError errorStatus={errorStatus} />}
                  <br />
                  <br />
                  <Form.Item className='form-item-multi-button'>
                    <Button onClick={() => cancle()} className="cancel-button">
                      {formatMessage('forgot.password.button.cancel')}
                    </Button>
                    <Button htmlType="submit" className="normal-button">
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
