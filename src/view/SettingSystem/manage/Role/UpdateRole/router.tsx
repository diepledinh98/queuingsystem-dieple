import { IRouter } from '@routers/interface';
import React from 'react';
import { IconSetting } from '@shared/components/iconsComponent';
export const routerViewUpdateRole: IRouter = {
    path: '/setting/manage/updaterole/:id',
    name: 'common.updaterole',
    loader: import('./UpdateRole'),
};