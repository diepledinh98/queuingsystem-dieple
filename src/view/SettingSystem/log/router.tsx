import { IRouter } from '@routers/interface';
import React from 'react';
import { IconSetting } from '@shared/components/iconsComponent';
export const routerViewHistory: IRouter = {
    path: '/setting/manage/addrole',
    name: 'common.history',
    loader: import('./UserLog'),
};