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
  DISMISS_ERROR,
  CHECK_TRIAGE_ITEM
} from '../actions/constants'

const initialState = {
  all: [],
  queue: {},
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
        return {...state, loading: {...state.loading, queue:false}, queue: Object.keys(payload.patients)
        .forEach(queueId => {
          if(payload.patients[queueId].sex === 'Female') {
            payload.patients[queueId] = {
              ...payload.patients[queueId],
              checklist:{
                vitals: false, cc: false, pmh: false, screening: false, misc: false, gynaecology: false
              }
            }
          }
          else {
            payload.patients[queueId] = {
              ...payload.patients[queueId],
              checklist:{
                vitals: false, cc: false, pmh: false, screening: false, misc: false
              }
            }
          }
        })
        }
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
        let queue = state.queue
        delete queue[payload.queueId]
        return {...state, loading: {...state.loading, spinner: false}, queue: queue}
      }
      case TRANSFER_PATIENT_ERROR: {
        return {...state, loading: {...state.loading, spinner: false}, error: payload.error}
      }
      case RESET_PATIENT_QUEUE: {
        return {...state, queue: {}}
      }
      case CHECK_TRIAGE_ITEM: {
        return {...state, queue: {...state.queue, [payload.queueId]: {
          ...state.queue[payload.queueId],
          checklist: {
            ...state.queue[payload.queueId].checklist,
            [payload.item]: true
          }
        }}}
      }
      case DISMISS_ERROR: {
      return {...state, error: null}
      }
      default: return state;
  }
}

export default patientsReducer