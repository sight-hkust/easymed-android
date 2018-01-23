import {
    CREATE_PATIENT_REQUEST,
    CREATE_PATIENT_SUCCESS,
    CREATE_PATIENT_ERROR,
    SEARCH_PATIENT_REQUEST,
    SEARCH_PATIENT_SUCCESS,
    SEARCH_PATIENT_ERROR
} from '../actions/constants';
  
  const initialState = {
    patient: {},
    error: false
  };
  
  const patientReducer = (state = initialState, {type, payload}) => {
    switch (type) {
      case CREATE_PATIENT_REQUEST: {
        return {...state};
      }
      case CREATE_PATIENT_SUCCESS: {
        return {...state, patient: payload.patient};
      }
      case CREATE_PATIENT_ERROR: {
        return {...state, error: payload.error_msg};
      }
      case SEARCH_PATIENT_REQUEST: {
        return {...state};
      }
      case SEARCH_PATIENT_SUCCESS: {
        return {...state, patient: payload.patient};
      }
      case SEARCH_PATIENT_ERROR: {
        return {...state, error: payload.error_msg};
      }
      default: return state;
    }
  }
  
  export default patientReducer