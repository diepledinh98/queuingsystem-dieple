import { IRouter } from '@routers/interface';

export const routerViewDetailDevice: IRouter = {
    path: '/detaildevice/:id',
    name: 'common.detaildevice',
    loader: import('./index'),
    exact: true,
    // menu: {
    //     'exact': true,
    //     activePath: /device/i,
    //     'hideInNavbar': false
    // }
};