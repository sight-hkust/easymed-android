import { 
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_ERROR
} from '../actions/constants';

const initialState = {
  user: {},
  loading: false,
  error: false
};

const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case AUTH_LOGIN_REQUEST: {
      return {...state, loading: true};
    }
    case AUTH_LOGIN_SUCCESS: {
      return {...state, loading: false, user: payload.user};
    }
    case AUTH_LOGIN_ERROR: {
      return {...state, error: payload.error_msg};
    }
    case AUTH_REGISTER_REQUEST: {
      return {...state, loading: true};
    }
    case AUTH_REGISTER_SUCCESS: {
      return {...state, loading: false};
    }
    case AUTH_REGISTER_ERROR: {
      return {...state, error: payload.error_msg};
    }
    default: return state;
  }
}

export default authReducer