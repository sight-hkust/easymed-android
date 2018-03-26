import {
    CREATE_VITALS_REQUEST,
    CREATE_VITALS_SUCCESS,
    CREATE_VITALS_ERROR
} from '../actions/constants'

const initialState = {
    vitals: {},
    error: null
}

const vitalsReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case CREATE_VITALS_REQUEST: {
            return {...state };
        }
        case CREATE_VITALS_SUCCESS: {
            return {...state };
        }
        case CREATE_VITALS_ERROR: {
            return {...state, error: payload.error};
        }
        default: return state;
    }
}