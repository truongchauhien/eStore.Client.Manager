import { combineEpics } from 'redux-observable';
import { userLoginRequestEpic } from './commons/user/user-epics';

export default combineEpics(userLoginRequestEpic);
