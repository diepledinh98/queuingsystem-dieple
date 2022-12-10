import { IRouter } from '@routers/interface';
import { DashboardIcon } from '@shared/components/iconsComponent';
import React from 'react';
export const routerUpdateAccount: IRouter = {
  path: '/updateaccount/:id',
  loader: import('./UpdateAccount'),
  exact: true,
  name: 'common.settingupdateaccount',

};
