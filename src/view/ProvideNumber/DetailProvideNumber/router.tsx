import { IRouter } from '@routers/interface';

export const routerViewDetailProvideNumber: IRouter = {
    path: '/detailnumber/:id',
    name: 'common.detail',
    loader: import('./DetailProvideNumber'),
    exact: true,
    // menu: {
    //     'exact': true,
    //     activePath: /provide/i,
    //     'hideInNavbar': false
    // }
};