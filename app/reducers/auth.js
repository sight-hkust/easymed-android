import { 
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_ERROR,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_ERROR
} from '../actions/constants';

const initialState = {
  authenticated: false,
  loading: false,
  error: null
};

const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case AUTH_LOGIN_REQUEST: {
      return {...state, loading: true};
    }
    case AUTH_LOGIN_SUCCESS: {
      return {...state, loading: false, authenticated: payload.authenticated};
    }
    case AUTH_LOGIN_ERROR: {
      return {...state, error: payload.error};
    }
    case AUTH_REGISTER_REQUEST: {
      return {...state, loading: true};
    }
    case AUTH_REGISTER_SUCCESS: {
      return {...state, loading: false};
    }
    case AUTH_REGISTER_ERROR: {
      return {...state, error: payload.error};
    }
    case AUTH_LOGOUT_REQUEST: {
      return {...state, loading: true};
    }
    case AUTH_LOGOUT_SUCCESS: {
      return {...state, loading: false, authenticated: payload.authenticated};
    }
    case AUTH_LOGOUT_ERROR: {
      return {...state, loading: false, error: payload.error}
    }
    default: return state;
  }
}

export default authReducer