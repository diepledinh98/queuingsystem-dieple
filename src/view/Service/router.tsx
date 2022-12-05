import { IRouter } from '@routers/interface';
import React from 'react';
import { IconSevice } from '@shared/components/iconsComponent';
export const routerViewService: IRouter = {
    path: '/service',
    name: 'common.service',
    loader: import('./index'),
    exact: true,
    menu: {
        icon: <IconSevice />,
        'exact': true,
        activePath: /service/i,
        'hideInNavbar': false
    }
};