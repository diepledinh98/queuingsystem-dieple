import './style.scss';

import { Button, Col, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import store from '@core/store/redux';
import { useSingleAsync } from '@hook/useAsync';
import HeaderComponent from '@layout/Header';
import RightMenu, { IArrayAction } from '@layout/RightMenu';
import { RootState } from '@modules';
import authenticationPresenter from '@modules/authentication/presenter';
import { removeProfile } from '@modules/authentication/profileStore';
import { DeleteConfirm } from '@shared/components/ConfirmDelete';
import MainTitleComponent from '@shared/components/MainTitleComponent';
import { useAltaIntl } from '@shared/hook/useTranslate';

import AvatarUser from './components/AvatarUser';
import ModalChangePassWord from './components/ModalChangePassWord';
import { routerViewProfile } from './router';
import { collection, DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { FirebaseConfig } from "../../../firebase/configs"

const UserProfile = () => {
  const db = FirebaseConfig.getInstance().fbDB;
  const history = useNavigate();
  const [form] = Form.useForm();
  const { formatMessage } = useAltaIntl();
  const [isVisible, setIsVisible] = useState(false);
  const [isDisableForm, setIsDisableForm] = useState(true);
  const user = useSelector((state: RootState) => state.profile.user);
  const updateAccounts = useSingleAsync(authenticationPresenter.updateProfile);
  console.log(user);

  const showModal = () => {
    setIsVisible(true);
  };
  interface UserType {
    id?: string
    email?: string
    name?: string
    phone?: string
    role?: string
    username?: string
  }
  const [userprofile, setUserprofile] = useState<UserType[]>([])

  const navigate = useNavigate();
  // useEffect(() => {
  //   if (user != null) {
  //     setIsDisableForm(true);
  //     form.setFieldsValue(user);
  //   }
  // }, [form, user]);

  useEffect(
    () =>
      onSnapshot(collection(db, 'users'), (snapshot:
        QuerySnapshot<DocumentData>) => {
        setUserprofile(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          })
        )
      }),
    []
  )

  const arrayAction: IArrayAction[] = [
    {
      iconType: 'edit',
      name: 'common.edit',
      handleAction: () => setIsDisableForm(false),
    },
    {
      iconType: 'key',
      name: 'common.change.password',
      handleAction: () => showModal(),
    },
    {
      iconType: 'logOut',
      name: 'common.logout',
      handleAction: () => {
        DeleteConfirm({
          title: formatMessage('common.logout.title'),
          content: formatMessage('common.logout.content'),
          handleOk: () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            // store.dispatch(removeProfile()), history.push('/login');
          },
        });
      },
    },
  ];

  const chooseFile = (file: any) => {
    form.setFieldsValue({ avatar: file });
  };

  const onUpdateProfile = (values: any) => {
    if (values) {
      updateAccounts.execute(values).then(() => {
        // authenticationPresenter.getProfile().then(() => {
        //   setIsDisableForm(true);
        // });
      });
    }
  };
  console.log(userprofile);

  return (
    <div>
      <div className="profile-page" style={{ marginLeft: 0 }}>
        <MainTitleComponent breadcrumbs={routerViewProfile} />
        <div className="main-component">
          <div className="profile-user__box">
            <Form
              name="userProfileForm"
              initialValues={user}
              layout="vertical"
              requiredMark={false}
              form={form}
              onFinish={onUpdateProfile}
              onResetCapture={() => {
                setIsDisableForm(true);
              }}
              id="userProfileForm"
            >
              <div className="profile-form__box" style={{ display: 'flex' }}>
                <div className="profile-avatar">
                  <AvatarUser disabled={isDisableForm} chooseFile={chooseFile} />
                  <p>{userprofile[0]?.username}</p>
                </div>

                <div className='content__info-information'>
                  <Row>
                    <Col span={12}>
                      <p>Tên người dùng</p>
                      <Input className='info__input' value={userprofile[0]?.username} />
                    </Col>
                    <Col span={12}>
                      <p>Tên đăng nhập</p>
                      <Input className='info__input' value={userprofile[0]?.email} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <p>Số điện thoại</p>
                      <Input className='info__input' value={userprofile[0]?.phone} />
                    </Col>
                    <Col span={12}>
                      <p>Mật khẩu</p>
                      <Input className='info__input' value='123456' type='password' />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <p>Email</p>
                      <Input className='info__input' value={userprofile[0]?.email} />
                    </Col>
                    <Col span={12}>
                      <p>Vai trò:</p>
                      <Input className='info__input' value={userprofile[0]?.role} />
                    </Col>
                  </Row>

                </div>


              </div>

            </Form>
            {/* <RightMenu arrayAction={arrayAction} /> */}
          </div>
          {/* <ModalChangePassWord isModalVisible={isVisible} setIsModalVisible={setIsVisible} /> */}

          {/* <div className="button-center__box profile-button-update">
            {!isDisableForm && (
              <>
                <Button className="cancel-button mx-5" onClick={() => setIsDisableForm(true)}>
                  {formatMessage('common.cancel')}
                </Button>
                <Button
                  type="primary"
                  className="normal-button"
                  htmlType="submit"
                  form="userProfileForm"
                  loading={updateAccounts?.status === 'loading'}
                >
                  {formatMessage('common.save')}
                </Button>
              </>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserProfile);
