import store from '@core/store/redux';
import UserEntity from '@modules/user/entity';
import profileStore, { removeProfile, setToken } from './profileStore';
import authenticationRepository, { ILoginDTO } from './repository';

const authenticationPresenter = { ...authenticationRepository };

authenticationPresenter.login = async (payload: ILoginDTO, remember = false) => {
    const response = await authenticationRepository.login(payload);
    store.dispatch(setToken({ token: response?.user?.accessToken, remember: true }));
    return response?.user?.accessToken;
};


authenticationPresenter.logout = async () => {
    const response = await authenticationRepository.logout();
    store.dispatch(removeProfile())
    return response;
}

// authenticationPresenter.getProfile = () => {
//   return authenticationRepository.getProfile().then((user: UserEntity) => {
//     store.dispatch(profileStore.actions.fetchProfile({ user }));
//     return Promise.resolve(user);
//   });
// };

export default authenticationPresenter;
