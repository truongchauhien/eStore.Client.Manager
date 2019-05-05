import { combineReducers } from 'redux';
import userReducer, { UserState } from './commons/user/user-reducer';

const rootReducer = combineReducers({
    user: userReducer
});

export type AppState = ReturnType<typeof rootReducer>
export default rootReducer
