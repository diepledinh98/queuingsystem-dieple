import { IRouter } from '@routers/interface';

export const routerViewUpdateService: IRouter = {
    path: '/updateservice/:id',
    name: 'common.updateservice',
    loader: import('./index'),
    exact: true,
    // menu: {
    //     'exact': true,
    //     activePath: /service/i,
    //     'hideInNavbar': false
    // }
};