import { IRouter } from '@routers/interface';

export const routerPageError: IRouter = {
  path: '/errorpage',
  masterLayout: false,
  loader: import('@view/PageError'),
};
