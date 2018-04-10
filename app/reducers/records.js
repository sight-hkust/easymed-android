import { 
  UPDATE_MEDICAL_HISTORY_REQUEST,
  UPDATE_MEDICAL_HISTORY_SUCCESS,
  UPDATE_MEDICAL_HISTORY_ERROR,
  UPDATE_PREGNANCY_STATUS_REQUEST,
  UPDATE_PREGNANCY_STATUS_SUCCESS,
  UPDATE_PREGNANCY_STATUS_ERROR,
  INSERT_VITALS_REQUEST,
  INSERT_VITALS_SUCCESS,
  INSERT_VITALS_ERROR,
  ATTACH_METADATA_REQUEST,
  ATTACH_METADATA_SUCCESS,
  ATTACH_METADATA_ERROR
} from '../actions/constants';

const initialState = {
  loading: {
    spinner: false
  },
  error: null
}

const medicalRecordReducer = (state = initialState, {payload, type}) => {
  switch(type) {
    case UPDATE_MEDICAL_HISTORY_REQUEST: {
      return {...state, loading: {...state.loading, spinner: true}}
    }
    case UPDATE_MEDICAL_HISTORY_SUCCESS: {
      return {...state, loading: {...state.loading, spinner: false}}
    }
    case UPDATE_MEDICAL_HISTORY_ERROR: {
      return {...state, loading:{...state.loading, spinner: false}, error: payload.error}
    }

  }
}