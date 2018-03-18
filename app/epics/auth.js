import { 
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_ERROR,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_ERROR
} from '../actions/constants';
import { register } from '../services/api'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';

const registerEpic = action$ => 
  action$.ofType(AUTH_REGISTER_REQUEST).concatMap(({payload}) => {
    const {username, password} = payload
    return Observable.fromPromise(register(username, password))
  }).map(isAuthenticated => ({type: isAuthenticated?AUTH_REGISTER_SUCCESS:AUTH_REGISTER_ERROR}))

export {registerEpic}