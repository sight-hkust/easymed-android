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
import { register, authenticate } from '../services/api'
// import { ActionsObservable } from 'redux-observable'
import { Observable, pipe } from 'rxjs';
import { concatMap, map, catchError } from 'rxjs/operators'

const registerEpic = action$ => 
  action$.ofType(AUTH_REGISTER_REQUEST).concatMap(({payload}) => {
    const {username, password} = payload
    return Observable.fromPromise(register(username, password))
  }).pipe(
    map(authenticated => ({type: AUTH_REGISTER_SUCCESS, payload: {authenticated}})),
    catchError(error => ({type: AUTH_REGISTER_ERROR, payload: {error}}))
  )

const loginEpic = action$ => 
  action$.ofType(AUTH_LOGIN_REQUEST).concatMap(({payload}) => {
    const {username, password} = payload
    return Observable.fromPromise(authenticate(username, password))
  }).pipe(
    map(authenticated => ({type: AUTH_LOGIN_SUCCESS, payload: {authenticated} })),
    catchError(error => ({type: AUTH_LOGIN_ERROR, payload: {error}}))
  )

const logoutEpic = action$ =>
  action$.ofType(AUTH_LOGOUT_REQUEST).concatMap(() => {
    return Observable.fromPromise(deauthenticate())
  }).pipe(
    map(authenticated => ({type: AUTH_LOGOUT_SUCCESS, payload: {authenticated}})),
    catchError(error => ({type: AUTH_LOGOUT_ERROR, payload: {error}}))
  )

export {registerEpic}