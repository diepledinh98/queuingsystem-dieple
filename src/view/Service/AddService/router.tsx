import { IRouter } from '@routers/interface';

export const routerViewAddService: IRouter = {
    path: '/addservice',
    name: 'common.addservice',
    loader: import('./index'),
    exact: true,
    // menu: {
    //     'exact': true,
    //     activePath: /service/i,
    //     'hideInNavbar': false
    // }
};