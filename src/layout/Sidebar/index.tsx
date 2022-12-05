import React, { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { UilAngleRight } from '@iconscout/react-unicons';
import { IRouter } from '@routers/interface';
import { privatePage } from '@routers/mainRouter';
import { logo } from '@shared/assets/svg';
import CheckPermission from '@shared/hoc/CheckPermission';
import './style.scss'
import MenuItem from './ItemMenu';
import authenticationPresenter from '@modules/authentication/presenter';
import IconLogout from '@shared/components/iconsComponent/IconLogout';
import { useSingleAsync } from '@hook/useAsync';
interface IRenderMenuProps {
  listNav: Array<IRouter>;
  location: string;
}

const renderMenu: React.FC<IRenderMenuProps> = (props: IRenderMenuProps) => {
  const listNav = props.listNav.slice(1, props.listNav.length + 1);
  // console.log('listNav:', listNav);

  return (
    <>
      {listNav.map((item: IRouter, index) => {
        if (item.menu == null || item.menu?.hideInNavbar) {
          return <React.Fragment key={index}></React.Fragment>;
        } else if (item.permissionCode) {
          return (
            <CheckPermission permissionCode={item.permissionCode} key={index}>
              <MenuItem data={item} key={index} />
            </CheckPermission>
          );
        } else {
          return <MenuItem data={item} key={index} />;
        }
      })}
    </>
  );
};

const RenderMenu = memo(renderMenu);

const SiderComponent: React.FC<{
  className: string;
  setClassName: (className: string) => void;
}> = props => {
  const location = useLocation();
  const navigate = useNavigate();
  const { className, setClassName } = props;
  const [width, setWidth] = useState<string | number>();
  const onClick = (e: any) => {
    setClassName('sider-component big');
    e.preventDefault();
    e.stopPropagation();
  };
  const { logout } = authenticationPresenter;
  const logoutCurrentAuth = useSingleAsync(logout)

  const SignOut = () => {
    logoutCurrentAuth.execute().then((response) =>
      console.log(response)
    )
  }
  useEffect(() => {
    if (className === 'sider-component') {
      setWidth(0);
    } else {
      setWidth('100%');
    }
  }, [className]);

  return (
    <div className={className} onClick={onClick}>
      <div className="icon">
        <UilAngleRight />
      </div>
      <div className="mask" style={{ width }}>
        <div className="logo">
          <img src={logo} alt="logo" onClick={() => navigate('/')} />
        </div>
        <div className="menu">
          <RenderMenu listNav={privatePage} location={location.pathname} />
        </div>
        <div className='logout d-flex' onClick={SignOut}>
          <div style={{ marginRight: 5 }}>
            <IconLogout />
          </div>

          Đăng xuất
        </div>
      </div>
    </div>
  );
};

export default SiderComponent;
