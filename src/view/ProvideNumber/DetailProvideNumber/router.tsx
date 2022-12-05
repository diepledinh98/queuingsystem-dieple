import { IRouter } from '@routers/interface';

export const routerViewDetailProvideNumber: IRouter = {
    path: '/detailnumber/:id',
    name: 'common.provide.number',
    loader: import('./DetailProvideNumber'),
    exact: true,
    // menu: {
    //     'exact': true,
    //     activePath: /provide/i,
    //     'hideInNavbar': false
    // }
};