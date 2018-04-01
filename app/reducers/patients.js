import {
  FETCH_PATIENT_LIST_REQUEST,
  FETCH_PATIENT_LIST_SUCCESS,
  FETCH_PATIENT_LIST_ERROR,
  FETCH_PATIENT_QUEUE_REQUEST,
  FETCH_PATIENT_QUEUE_SUCCESS,
  FETCH_PATIENT_QUEUE_ERROR,
  QUEUE_PATIENT_REQUEST,
  QUEUE_PATIENT_SUCCESS,
  QUEUE_PATIENT_ERROR,
  FORWARD_PATIENT_STAGE_REQUEST,
  FORWARD_PATIENT_STAGE_SUCCESS,
  FORWARD_PATIENT_STAGE_ERROR
} from '../actions/constants'

const initialState = {
  all: [],
  queue: [],
  loading: { queue: false, all: false, spinner: false },
  error: null
};

const patientsReducer = (state = initialState, {type, payload}) => {
  switch(type) {
      case FETCH_PATIENT_LIST_REQUEST: {
          return {...state, loading: {...state.loading, all:true} };
      }
      case FETCH_PATIENT_LIST_SUCCESS: {
          return {...state, loading: {...state.loading, all:false}, all: payload.patients};
      }
      case FETCH_PATIENT_LIST_ERROR: {
          return {...state, loading: {...state.loading, all:false}, error: payload.error};
      }
      case FETCH_PATIENT_QUEUE_REQUEST: {
          return {...state, loading: {...state.loading, queue:true} };
      }
      case FETCH_PATIENT_QUEUE_SUCCESS: {
          return {...state, loading: {...state.loading, queue:false}, queue: payload.patients}
      }
      case FETCH_PATIENT_QUEUE_ERROR: {
          return {...state, loading: {...state.loading, queue:false}, error: payload.error}
      }
      case QUEUE_PATIENT_REQUEST: {
          return {...state, loading: {...state.loading, spinner: true}}
      }
      case QUEUE_PATIENT_SUCCESS: {
          return {...state, loading: {...state.loading, spinner:false}, queue: [...state.queue, payload.patient]}
      }
      case QUEUE_PATIENT_ERROR: {
          return {...state, loading: {...state.loading, spinner:false}, error: payload.error}
      }
      case FORWARD_PATIENT_STAGE_REQUEST: {
          return {...state, loading: {...state.loading, spinner: true}}
      }
      case FORWARD_PATIENT_STAGE_SUCCESS: {
          return {...state, loading: {...state.loading, spinner: false}}
      }
      case FORWARD_PATIENT_STAGE_ERROR: {
          return {...state, loading: {...state.loading, spinner: false}, error: payload.error}
      }
      default: return state;
  }
}

export default patientsReducer