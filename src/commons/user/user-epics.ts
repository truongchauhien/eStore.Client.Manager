import { from, of } from 'rxjs';
import { mergeMap, filter, map, catchError } from 'rxjs/operators';
import {
    USER_LOGIN_REQUEST,
    IUserAction,
    IUserLoginRequest,
    userLoginRequestSuccess,
    userLoginRequestError
} from './user-actions';
import { loginRequest } from '../apis/auth';

export const userLoginRequestEpic = (action$: any) => {
    return action$.pipe(
        filter((action: IUserAction) => action.type === USER_LOGIN_REQUEST),
        mergeMap((action: IUserLoginRequest) =>
            from(loginRequest(action.payload)).pipe(
                map(data => userLoginRequestSuccess(data)),
                catchError(data => of(userLoginRequestError(data))))
        )
    );
}
