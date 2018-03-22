import {
    CREATE_PROFILE_REQUEST,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_ERROR,
    SEARCH_PROFILE_REQUEST,
    SEARCH_PROFILE_SUCCESS,
    SEARCH_PROFILE_ERROR
} from '../actions/constants'

const initialState = {
    profile: {},
    loading: false,
    error: null
};

const profileReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case CREATE_PROFILE_REQUEST: {
            return {...state, loading: true};
        }
        case CREATE_PROFILE_SUCCESS: {
            return {...state, loading: false};
        }
        case CREATE_PROFILE_ERROR: {
            return {...state, error: payload.error};
        }
        default: return state;
    }
}

export default profileReducer