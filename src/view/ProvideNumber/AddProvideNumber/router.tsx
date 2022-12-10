import { IRouter } from '@routers/interface';

export const routerViewAddProvideNumber: IRouter = {
    path: '/addprovide',
    name: 'common.providenewnunber',
    loader: import('./index'),
    exact: true,
    // menu: {
    //     'exact': true,
    //     activePath: /provide/i,
    //     'hideInNavbar': false
    // }
};