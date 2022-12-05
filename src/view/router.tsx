import { IRouter } from '@routers/interface';

export const routerViewRoot: IRouter = {
    path: '/',
    name: 'common.homepage',
    loader: import('./Homepage/index'),
    exact: true,
};

