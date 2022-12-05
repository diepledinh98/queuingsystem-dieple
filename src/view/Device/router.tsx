import { IRouter } from '@routers/interface';
import { DashboardIcon } from '@shared/components/iconsComponent';
import { IconDevice } from '@shared/components/iconsComponent/deviceicon';
import React from 'react';
export const routerViewDevice: IRouter = {
    path: '/device',
    name: 'common.device',
    loader: import('./index'),
    exact: true,
    menu: {
        icon: <IconDevice />,
        'exact': true,
        activePath: /device/i,
        'hideInNavbar': false
    }
};