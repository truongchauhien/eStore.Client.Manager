import { IApiResponse } from "../apis/commons/apiRequest";

export const USER_LOGIN_REQUEST = 'LOGIN_REQUEST';
export const USER_LOGIN_REQUEST_ERROR = 'LOGIN_REQUEST_ERROR';
export const USER_LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const USER_LOGIN_CLEAR_MESSAGE = 'LOGIN_CLEAR_ERROR_MESSAGE';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';

export interface IUserLoginRequest {
    type: typeof USER_LOGIN_REQUEST
    payload: {
        userName: string,
        password: string
    }
}

export interface IUserLoginRequestError {
    type: typeof USER_LOGIN_REQUEST_ERROR,
    payload: IApiResponse
}

export interface IUserLoginRequestSuccess {
    type: typeof USER_LOGIN_REQUEST_SUCCESS,
    payload: {
        userId: string,
        refreshToken: string,
        accessToken: string,
        expiredAt: number,
        user: {
            userName: string,
            fullName: string,
            roles: string[]
        }
    }
}

export interface IUserLoginClearMessage {
    type: typeof USER_LOGIN_CLEAR_MESSAGE
}

export function userLoginRequest(payload: IUserLoginRequest['payload']): IUserLoginRequest {
    return {
        type: USER_LOGIN_REQUEST,
        payload: payload
    };
}

export function userLoginRequestError(payload: IUserLoginRequestError['payload']): IUserLoginRequestError {
    return {
        type: USER_LOGIN_REQUEST_ERROR,
        payload: payload
    };
}

export function userLoginRequestSuccess(payload: IUserLoginRequestSuccess['payload']): IUserLoginRequestSuccess {
    localStorage.setItem('userId', payload.userId);
    localStorage.setItem('refreshToken', payload.refreshToken);
    localStorage.setItem('accessToken', payload.accessToken);
    localStorage.setItem('expiredAt', String(payload.expiredAt));
    localStorage.setItem('user', JSON.stringify(payload.user));

    return {
        type: USER_LOGIN_REQUEST_SUCCESS,
        payload: payload
    };
}

export function userLoginClearMessage(): IUserLoginClearMessage {
    return {
        type: USER_LOGIN_CLEAR_MESSAGE
    };
}

interface IUserLogoutRequest {
    type: typeof USER_LOGOUT_REQUEST
}

export function userLogoutRequest(): IUserLogoutRequest {
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiredAt');
    
    return {
        type: USER_LOGOUT_REQUEST
    }
}

export type IUserAction = IUserLoginRequest | IUserLoginRequestError | IUserLoginRequestSuccess
    | IUserLogoutRequest;
