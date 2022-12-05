import { routerForgotPassword } from '@view/Auth/ForgotPassword/router';
import { routerLogin } from '@view/Auth/Login/router';
import { routerViewProfile } from '@view/Auth/Profile/router';
import { routerViewDevice } from '@view/Device/router';
import { routerHomepage } from '@view/Homepage/router';
import { routerViewProvideNumber } from '@view/ProvideNumber/router';
import { routerViewReport } from '@view/Report/router';
import { routerViewRoot } from '@view/router';
import { routerViewService } from '@view/Service/router';
import { routerViewSetting } from '@view/SettingSystem/router';
import { routerPageError } from '@view/PageError/router';
import { IRouter } from './interface';
import { routerViewAddDevice } from '@view/Device/AddDevice/router';
import { routerViewDetailDevice } from '@view/Device/DetailDevice/router';
import { routerViewUpdateDevice } from '@view/Device/UpdateDevice/router';
import { routerViewAddService } from '@view/Service/AddService/router';
import { routerViewDetailService } from '@view/Service/DetailService/router';
import { routerViewUpdateService } from '@view/Service/UpdateService/router';
import { routerViewAddProvideNumber } from '@view/ProvideNumber/AddProvideNumber/router';
import { routerAddAccount } from '@view/SettingSystem/manage/Account/AddCount/router';
import { routerUpdateAccount } from '@view/SettingSystem/manage/Account/UpdateAccount/router';
import { routerViewDetailProvideNumber } from '@view/ProvideNumber/DetailProvideNumber/router';
import { routerViewAddRole } from '@view/SettingSystem/manage/Role/AddRole/router';
import { routerViewUpdateRole } from '@view/SettingSystem/manage/Role/UpdateRole/router';
export const privatePage: IRouter[] = [routerViewRoot, routerHomepage, routerViewProfile, routerViewAddDevice, routerViewDevice, routerViewDetailDevice,
    routerViewService, routerViewAddService, routerViewDetailService, routerViewUpdateService, routerViewProvideNumber, routerViewReport, routerViewSetting, routerViewUpdateDevice,
    routerViewAddProvideNumber, routerAddAccount, routerUpdateAccount, routerViewDetailProvideNumber, routerViewAddRole, routerViewUpdateRole, routerPageError
];

export const publicPage: IRouter[] = [routerLogin, routerForgotPassword];
