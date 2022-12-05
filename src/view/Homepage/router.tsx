import { IRouter } from '@routers/interface';
import { DashboardIcon } from '@shared/components/iconsComponent';
import React from 'react';
export const routerHomepage: IRouter = {
  path: '/home',
  loader: import('./index'),
  exact: true,
  name: 'common.homepage',
  menu: {
    icon: <DashboardIcon />,
    'exact': true,
    activePath: /home/i,
    'hideInNavbar': false
  }
};
