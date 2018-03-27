import {
    CREATE_PATIENT_REQUEST,
    CREATE_PATIENT_SUCCESS,
    CREATE_PATIENT_ERROR,
    SEARCH_PATIENT_REQUEST,
    SEARCH_PATIENT_SUCCESS,
    SEARCH_PATIENT_ERROR
} from '../actions/constants'

const initialState = {
    patientId: null,
    loading: false,
    error: null
};

const profileReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case CREATE_PATIENT_REQUEST: {
            return {...state, loading: true };
        }
        case CREATE_PATIENT_SUCCESS: {
            return {...state, loading: false, patientId: payload.patientId};
        }
        case CREATE_PATIENT_ERROR: {
            return {...state, loading: false, error: payload.error};
        }
        default: return state;
    }
}

export default profileReducer