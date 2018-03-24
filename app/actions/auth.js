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
} from './constants';

export const logIn = (username, password) => ({
  type: AUTH_LOGIN_REQUEST,
  payload: {username, password}
});

export const logOut = () => ({
  type: AUTH_LOGOUT_REQUEST
})

export const register = (username, password) => ({
  type: AUTH_REGISTER_REQUEST,
  payload: {username, password}
})