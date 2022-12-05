import { IRouter } from '@routers/interface';
import React from 'react';
import { IconSetting } from '@shared/components/iconsComponent';
export const routerViewAddRole: IRouter = {
    path: '/setting/manage/addrole',
    name: 'common.addrole',
    loader: import('./AddRole'),

};