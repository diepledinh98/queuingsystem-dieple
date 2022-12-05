import { IRouter } from '@routers/interface';
import { DashboardIcon } from '@shared/components/iconsComponent';
import React from 'react';
export const routerAddAccount: IRouter = {
  path: '/addaccount',
  loader: import('./AddCount'),
  exact: true,
  name: 'common.homepage',

};
