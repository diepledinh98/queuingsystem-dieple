import { IRouter } from '@routers/interface';
import React from 'react';
import { IconNums } from '@shared/components/iconsComponent';
export const routerViewProvideNumber: IRouter = {
    path: '/provide',
    name: 'common.provide.number',
    loader: import('./index'),
    exact: true,
    menu: {
        icon: <IconNums />,
        'exact': true,
        activePath: /provide/i,
        'hideInNavbar': false
    }
};