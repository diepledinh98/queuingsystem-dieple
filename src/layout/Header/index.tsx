import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '@modules';
import UserEntity from '@modules/user/entity';
import { Selector } from '@reduxjs/toolkit';
import { imgAvatar } from '@shared/assets/images';
import ChangeLanguage from '@shared/components/ChangeLanguage';
import { IconBell } from '@shared/components/iconsComponent';
import { Button, Popover } from 'antd';
import { useAppDispatch, useAppSelector } from '@shared/hook/reduxhook';
import { fetchProvideNumber } from '@modules/providenumber/numberStore';
import './Header.scss'
interface IHeaderComponent {
  profile?: UserEntity;
}

const HeaderComponentSelector: Selector<RootState, IHeaderComponent> = (state: RootState) => {
  return {
    profile: state.profile.user,
  };
};
const contentAnnoun = () => {
  const dispatch = useAppDispatch()
  const listProvideNumber: Array<any> | any = useAppSelector((state) => state.providenumber.Number);
  useEffect(() => {
    dispatch(fetchProvideNumber())
  })
  return (
    <div className="announ__wrap">
      <div className="announ-header">
        <span>THÔNG BÁO</span>
      </div>
      <div className="announ-body">
        <div className="announ-body-list">
          {(listProvideNumber.length < 1) ? (
            <div className="announ-body-item">
              <div className="announ-body-item-user">KHÔNG CÓ THÔNG BÁO</div>
              <div className="announ-body-item-time">
                Bạn chưa có bất kỳ thông báo nào!
              </div>
            </div>
          ) : (
            <>
              {listProvideNumber.map((item, index) => {

                return (
                  <div className="announ-body-item" key={index}>
                    <div className="announ-body-item-user">
                      Người dùng: {item.customer.username}
                    </div>
                    <div className="announ-body-item-time">
                      Thời gian nhận số: {item.timeprovide.slice(0, 2)}h{item.timeprovide.slice(2, 4)} ngày {item.timeprovide.slice(8)}
                    </div>
                  </div>
                )
              })}




            </>
          )}
        </div>
      </div>
    </div>
  );
};
const HeaderComponent = () => {
  const { profile } = useSelector(HeaderComponentSelector);
  const navigate = useNavigate();

  return (
    <>
      <div className="header-component" >

        <Popover placement="bottom" content={contentAnnoun} trigger="click">
          <div className="header-component__search" style={{ color: '#FFAC6' }}>
            <IconBell />
          </div>
        </Popover>
        <div className="header-component__dropdown">
          <div className="dropdown__profile__img">
            <img alt="img-avatar" className="img-avatar" src={profile?.avatar || imgAvatar} />
          </div>
        </div>
        <div
          className="header-component__identify"
          onClick={() => {
            navigate('/profile');
          }}
        >
          <h4 className="identify__admin">{profile?.userFullName}</h4>
          <p className="identify__place">{profile?.email || 'Lê Đình Điệp'}</p>
          <p className="identify__hi">{(profile && profile?.role?.roleName) || 'Kế toán'}</p>
        </div>
      </div>
    </>
  );
};

export default memo(HeaderComponent);
