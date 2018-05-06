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
  TRANSFER_PATIENT_REQUEST,
  TRANSFER_PATIENT_SUCCESS,
  TRANSFER_PATIENT_ERROR,
  RESET_PATIENT_QUEUE,
  DISMISS_ERROR
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
          return {...state, loading: {...state.loading, queue:false}, queue: payload.patients.sort((p, s) => parseInt(p.patient.tag) - parseInt(s.patient.tag))}
      }
      case FETCH_PATIENT_QUEUE_ERROR: {
          return {...state, loading: {...state.loading, queue:false}, error: payload.error}
      }
      case QUEUE_PATIENT_REQUEST: {
          return {...state, loading: {...state.loading, spinner: true}}
      }
      case QUEUE_PATIENT_SUCCESS: {
          const queue = [...state.queue, payload]
          return {...state, loading: {...state.loading, spinner:false}, queue: queue}
      }
      case QUEUE_PATIENT_ERROR: {
          return {...state, loading: {...state.loading, spinner:false}, error: payload.error}
      }
      case TRANSFER_PATIENT_REQUEST: {
          return {...state, loading: {...state.loading, spinner: true}}
      }
      case TRANSFER_PATIENT_SUCCESS: {
        const index = state.queue.findIndex(({queueId}) => queueId === payload.queueId)
        let queue = state.queue
        queue.splice(index, 1)
        return {...state, loading: {...state.loading, spinner: false}, queue: queue}
      }
      case TRANSFER_PATIENT_ERROR: {
        return {...state, loading: {...state.loading, spinner: false}, error: payload.error}
      }
      case RESET_PATIENT_QUEUE: {
          return {...state, queue: []}
      }
      case DISMISS_ERROR: {
          return {...state, error: null}
      }
      default: return state;
  }
}

export default patientsReducer