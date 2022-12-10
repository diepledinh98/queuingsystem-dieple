import { IRouter } from '@routers/interface';

export const routerNewPassWord: IRouter = {
    path: '/newpassword',
    loader: import('./index'),
    exact: true,
    masterLayout: false,
};
