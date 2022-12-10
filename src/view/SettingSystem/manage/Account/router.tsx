import { IRouter } from '@routers/interface';
import { DashboardIcon } from '@shared/components/iconsComponent';
import React from 'react';
export const routerViewAccount: IRouter = {
    path: '/addaccount',
    loader: import('./AccountManage'),
    exact: true,
    name: 'common.qltaikhoan',

};
