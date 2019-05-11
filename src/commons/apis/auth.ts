import requestApi from './commons/apiRequest';
import { IUserLoginRequest, IUserLoginRequestSuccess } from '../user/user-actions';

export async function userLoginApi(payload: IUserLoginRequest['payload']): Promise<IUserLoginRequestSuccess['payload']> {
    const response = await requestApi({
        method: 'POST',
        resource: '/auth/login',
        body: payload
    });

    if (response.isOk && response.status === 200) {
        return response.body as IUserLoginRequestSuccess['payload'];
    }

    throw response;
}
