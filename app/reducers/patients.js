import {
  FETCH_PATIENT_LIST_REQUEST,
  FETCH_PATIENT_LIST_SUCCESS,
  FETCH_PATIENT_LIST_ERROR
} from '../actions/constants'

const initialState = {
  patients: [],
  loading: false,
  error: null
};

const patientsReducer = (state = initialState, {type, payload}) => {
  switch(type) {
      case FETCH_PATIENT_LIST_REQUEST: {
          return {...state, loading: true };
      }
      case FETCH_PATIENT_LIST_SUCCESS: {
          return {...state, loading: false, patients: payload.patients};
      }
      case FETCH_PATIENT_LIST_ERROR: {
          return {...state, loading: false, error: payload.error};
      }
      default: return state;
  }
}

export default patientsReducer