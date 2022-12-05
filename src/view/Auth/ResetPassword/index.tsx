import '../styles.scss';

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import authenticationPresenter from '@modules/authentication/presenter';
import { useSingleAsync } from '@shared/hook/useAsync';
import { useAltaIntl } from '@shared/hook/useTranslate';

import NavLinkBottom from '../components/NavLinkBottom';
import TokenErrorStatus from './components/TokenErrorStatus';
import UpdatePasswordForm from './components/UpdatePasswordForm';

const ResetPassword = () => {
  const history = useNavigate();
  const { formatMessage } = useAltaIntl();
  const [isRecoveryToken, setIsRecoveryToken] = useState<boolean>(true);
  const { CheckRecoveryToken } = authenticationPresenter;
  const CheckRecoveryTokenCall = useSingleAsync(CheckRecoveryToken);
  const { token } = useParams<{ token: any }>();

  useEffect(() => {
    CheckRecoveryTokenCall?.execute(token)
      .then(() => {
        setIsRecoveryToken(true);
      })
      .catch(() => {
        setIsRecoveryToken(false);
      });
  }, [CheckRecoveryTokenCall, token]);

  return (
    <>
      {!isRecoveryToken ? <UpdatePasswordForm recoveryToken={token} /> : <TokenErrorStatus />}
      <NavLinkBottom
        navLink={formatMessage('link.return.login')}
        onClick={() => history.push('/login')}
      />
    </>
  );
};
export default ResetPassword;
