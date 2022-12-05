import { IRouter } from '@routers/interface';
import React from 'react';
import { IconReport } from '@shared/components/iconsComponent';
export const routerViewReport: IRouter = {
    path: '/report',
    name: 'common.report',
    loader: import('./index'),
    exact: true,
    menu: {
        icon: <IconReport />,
        'exact': true,
        activePath: /report/i,
        'hideInNavbar': false
    }
};