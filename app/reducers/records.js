import {
  ADD_VITALS_REQUEST,
  ADD_VITALS_SUCCESS,
  ADD_VITALS_ERROR,
  ADD_CHIEF_COMPLAINTS_REQUEST,
  ADD_CHIEF_COMPLAINTS_SUCCESS,
  ADD_CHIEF_COMPLAINTS_ERROR,
  ADD_GYNAECOLOGY_INFO_REQUEST,
  ADD_GYNAECOLOGY_INFO_SUCCESS,
  ADD_GYNAECOLOGY_INFO_ERROR,
  UPDATE_MEDICAL_HISTORY_REQUEST,
  UPDATE_MEDICAL_HISTORY_SUCCESS,
  UPDATE_MEDICAL_HISTORY_ERROR,
  UPDATE_SCREENING_RESULT_REQUEST,
  UPDATE_SCREENING_RESULT_SUCCESS,
  UPDATE_SCREENING_RESULT_ERROR,
  UPDATE_MEDICAL_CONDITION_REQUEST,
  UPDATE_MEDICAL_CONDITION_SUCCESS,
  UPDATE_MEDICAL_CONDITION_ERROR,
  ATTACH_METADATA_REQUEST,
  ATTACH_METADATA_SUCCESS,
  ATTACH_METADATA_ERROR,
  DISMISS_ERROR,
  FETCH_MEDICAL_RECORDS_REQUEST,
  FETCH_MEDICAL_RECORDS_SUCCESS,
  FETCH_MEDICAL_RECORDS_ERROR,
  FETCH_MEDICINE_REQUEST,
  FETCH_MEDICINE_SUCCESS,
  FETCH_MEDICINE_ERROR,
} from '../actions/constants';

const initialState = {
  loading: {
    spinner: false
  },
  patients: {},
  medicines: [],
  error: null
}

const medicalRecordReducer = (state = initialState, {payload, type}) => {
  switch(type) {
    case FETCH_MEDICAL_RECORDS_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case FETCH_MEDICAL_RECORDS_SUCCESS: {
      return {...state, loading: {spinner: false}}
    }
    case FETCH_MEDICAL_RECORDS_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case FETCH_MEDICINE_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case FETCH_MEDICINE_SUCCESS: {
      return {...state, loading: {spinner: false}, medicines: payload.medicines}
    }
    case FETCH_MEDICINE_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case ATTACH_METADATA_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case ATTACH_METADATA_SUCCESS: {
      return {...state, loading: {spinner: false}}
    }
    case ATTACH_METADATA_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case ADD_VITALS_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case ADD_VITALS_SUCCESS: {
      return {...state, loading: {spinner: false}}
    }
    case ADD_VITALS_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case ADD_CHIEF_COMPLAINTS_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case ADD_CHIEF_COMPLAINTS_SUCCESS: {
      return {...state, loading: {spinner: false}}
    }
    case ADD_CHIEF_COMPLAINTS_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case ADD_GYNAECOLOGY_INFO_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case ADD_GYNAECOLOGY_INFO_SUCCESS: {
      return {...state, loading: {spinner: false}}
    }
    case ADD_GYNAECOLOGY_INFO_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case UPDATE_MEDICAL_HISTORY_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case UPDATE_MEDICAL_HISTORY_SUCCESS: {
      return {...state, loading: {spinner: false}}
    }
    case UPDATE_MEDICAL_HISTORY_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case UPDATE_SCREENING_RESULT_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case UPDATE_SCREENING_RESULT_SUCCESS: {
      return {...state, loading: {spinner: false}}
    }
    case UPDATE_SCREENING_RESULT_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case UPDATE_MEDICAL_CONDITION_REQUEST: {
      return {...state, loading: {spinner: true}}
    }
    case UPDATE_MEDICAL_CONDITION_SUCCESS: {
      return {...state, loading: {spinner: false}}
    }
    case UPDATE_MEDICAL_CONDITION_ERROR: {
      return {...state, loading: {spinner: false}, error: payload.error}
    }
    case DISMISS_ERROR: {
      return {...state, error: null}
    }
    default: return state
  }
}

export default medicalRecordReducer