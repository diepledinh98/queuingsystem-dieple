import './styles.scss';

import { Button } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import { logo } from '@assets/images';

const PageError = () => {
  const history = useNavigate();
  const intl = useIntl();
  const handleBackHome = () => {
    history('/')
  }
  return (
    <div className="page-error">
      <div className="main-content">
        <div className="label-logo-forgot">
          <img src={logo} alt="pepsico" />
        </div>
        <div className="title-404">{intl.formatMessage({ id: 'common.404error' })}</div>
        <div className="page-not-found">{intl.formatMessage({ id: 'common.page.notfound' })}</div>
        <p className="note-404">{intl.formatMessage({ id: 'common.404note' })}</p>
        <Button className="btn-err">
          <a onClick={handleBackHome}>{intl.formatMessage({ id: 'common.back' })}</a>
        </Button>
      </div>
    </div>
  );
};

export default PageError;
