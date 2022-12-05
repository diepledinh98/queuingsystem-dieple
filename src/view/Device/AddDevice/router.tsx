import { IRouter } from '@routers/interface';

export const routerViewAddDevice: IRouter = {
    path: '/AddDevice',
    name: `common.adddevice`,
    loader: import('./index'),
    exact: true,
    // menu: {
    //     'exact': true,
    //     activePath: /device/i,
    //     'hideInNavbar': false
    // }
};