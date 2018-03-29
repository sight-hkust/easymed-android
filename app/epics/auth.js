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
import { register, authenticate, deauthenticate } from '../services/api'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounce'

const registerEpic = action$ => 
  action$.ofType(AUTH_REGISTER_REQUEST).concatMap(({payload}) => {
    const {username, password} = payload
    return Observable.fromPromise(register(username, password))
  })
  .map(authenticated => ({type: AUTH_REGISTER_SUCCESS, payload: {authenticated}}))
  .catch(error => Observable.of({type: AUTH_REGISTER_ERROR, payload: {error}}))

const loginEpic = action$ => 
  action$.ofType(AUTH_LOGIN_REQUEST).concatMap(({payload}) => {
    const {username, password} = payload
    return Observable.fromPromise(authenticate(username, password))
  })
  .map(authenticated => ({type: AUTH_LOGIN_SUCCESS, payload: {authenticated} }))
  .catch(error => Observable.of({type: AUTH_LOGIN_ERROR, payload: {error}}))

const logoutEpic = action$ =>
  action$.ofType(AUTH_LOGOUT_REQUEST).concatMap(() => {
    return Observable.fromPromise(deauthenticate())
  })
  .map(authenticated => ({type: AUTH_LOGOUT_SUCCESS, payload: {authenticated}}))
  .catch(error => Observable.of({type: AUTH_LOGOUT_ERROR, payload: {error}}))

export {loginEpic, logoutEpic, registerEpic}