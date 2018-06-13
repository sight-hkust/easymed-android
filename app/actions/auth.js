import { 
  AUTH_LOGIN_REQUEST,
  AUTH_LOGOUT_REQUEST,
  AUTH_REGISTER_REQUEST,
  RESET_ERROR
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

export const resetError = () => ({
  type: RESET_ERROR
})