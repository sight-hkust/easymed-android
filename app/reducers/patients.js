import {
  FETCH_PATIENT_LIST_REQUEST,
  FETCH_PATIENT_LIST_SUCCESS,
  FETCH_PATIENT_LIST_ERROR,
  FETCH_PATIENT_QUEUE_REQUEST,
  FETCH_PATIENT_QUEUE_SUCCESS,
  FETCH_PATIENT_QUEUE_ERROR,
  QUEUE_PATIENT_REQUEST,
  QUEUE_PATIENT_SUCCESS,
  QUEUE_PATIENT_ERROR
} from '../actions/constants'

const initialState = {
  patients: [],
  queue: [],
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
      case FETCH_PATIENT_QUEUE_REQUEST: {
          return {...state, loading: true };
      }
      case FETCH_PATIENT_QUEUE_SUCCESS: {
          return {...state, loading: false, queue: payload.patients}
      }
      case FETCH_PATIENT_QUEUE_ERROR: {
          return {...state, loading: false, error: payload.error}
      }
      case QUEUE_PATIENT_REQUEST: {
          return {...state, loading: true}
      }
      case QUEUE_PATIENT_SUCCESS: {
          return {...state, loading: false, queue: [...state.queue, payload.patientId]}
      }
      case QUEUE_PATIENT_ERROR: {
          return {...state, loading: false, error: payload.error}
      }
      default: return state;
  }
}

export default patientsReducer