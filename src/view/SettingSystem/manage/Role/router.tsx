import { IRouter } from '@routers/interface';
import React from 'react';
import { IconSetting } from '@shared/components/iconsComponent';
export const routerViewRole: IRouter = {
    path: '/setting/manage/addrole',
    name: 'common.manage.role',
    loader: import('./RoleManage'),
};