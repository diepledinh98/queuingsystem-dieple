import { IRouter } from '@routers/interface';

export const routerViewDetailService: IRouter = {
    path: '/detailservice/:id',
    name: 'common.detailservice',
    loader: import('./index'),
    exact: true,
    // menu: {
    //     'exact': true,
    //     activePath: /service/i,
    //     'hideInNavbar': false
    // }
};