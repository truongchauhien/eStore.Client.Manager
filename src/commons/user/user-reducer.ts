import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_REQUEST_ERROR,
    USER_LOGIN_REQUEST_SUCCESS,
    IUserAction,
    IUserLoginRequestSuccess,
    USER_LOGOUT_REQUEST
} from './user-actions';

export interface UserState {
    isAuthenticated: boolean,
    isFetching: boolean,
    errorCode: number,
    userName: string,
    fullName: string,
    roles: string[]
}

const initUserState = ((): UserState => {
    let userJson = localStorage.getItem('user');
    let user: IUserLoginRequestSuccess['payload']['user'] = userJson && JSON.parse(userJson);

    return {
        isAuthenticated: localStorage.getItem('userId') !== null,
        isFetching: false,
        errorCode: 0,
        userName: user && user.userName,
        fullName: user && user.fullName,
        roles: user && user.roles,
    }
})();

export default function userReducer(state: UserState = initUserState, action: IUserAction): UserState {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return Object.assign({}, state,
                {
                    isFetching: true
                }
            );
        case USER_LOGIN_REQUEST_ERROR: {
            let errorCode = !action.payload.isOk ? -1 : action.payload.status;
            return Object.assign({}, state,
                {
                    isAuthenticated: false,
                    isFetching: false,
                    errorCode: errorCode
                }
            )
        }
        case USER_LOGIN_REQUEST_SUCCESS:
            const { userName, fullName, roles } = action.payload.user
            return Object.assign({}, state,
                {
                    isAuthenticated: true,
                    isFetching: false,
                    errorCode: 0,
                    userName,
                    fullName,
                    roles
                }
            )
        case USER_LOGOUT_REQUEST:
            return Object.assign({}, state, {
                isAuthenticated: false,
                userName: null,
                fullName: null,
                roles: []
            });
        default:
            return state
    }
}
