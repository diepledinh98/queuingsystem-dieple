import '@shared/assets/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '@styles/styles.scss';

import { ConfigProvider } from 'antd';
import lodash from 'lodash';
import React, { memo, Suspense, useEffect, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import locale from '@locale/index';
import { removeProfile, setToken, TokenSelector } from '@modules/authentication/profileStore';
import { LanguageSelector } from '@modules/setting/settingStore';
import PrivatePage from '@routers/component/PrivatePage';

import PublicPage from '../routers/component/PublicPage';
import { FirebaseConfig } from 'src/firebase/configs';


const auth = FirebaseConfig.getInstance().auth;

const MainView = memo(({ statusLogin }: { statusLogin: boolean }) => {
  return (
    <>
      {statusLogin ? (
        <Suspense fallback={<></>}>
          <PrivatePage />
        </Suspense>
      ) : (
        <Suspense fallback={<></>}>
          <PublicPage />
        </Suspense>
      )}
    </>
  );
});

// For Test
const App: React.FC = () => {
  const { token } = useSelector(TokenSelector);
  const { language } = useSelector(LanguageSelector);
  const history = useNavigate();
  const dispatch = useDispatch();
  const memoLangData = useMemo(() => {
    return locale[language];
  }, [language]);
  useEffect(() => {
    if (!token) {
      history('/login');
    }

    // const logout = () => {
    //   auth.signOut().then(() => {
    //     console.log("logout thanh cong")
    //     dispatch(removeProfile())
    //   }).catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log({ Errorcode: errorCode, ErrorMessage: errorMessage })
    //   });
    // }

    // logout()
  }, [token]);

  return (
    <IntlProvider locale={language} messages={memoLangData}>
      <ConfigProvider locale={memoLangData}>
        <MainView statusLogin={!lodash.isEmpty(token)} />
      </ConfigProvider>
    </IntlProvider>
  );
};

export default App;
