import {
  CREATE_CASE_REQUEST,
  CREATE_CASE_SUCCESS,
  CREATE_CASE_ERROR,
  CREATE_CASE_FOLDER_REQUEST,
  CREATE_CASE_FOLDER_SUCCESS,
  CREATE_CASE_FOLDER_ERROR
} from '../actions/constants'

const initialState = {
  loading: false,
  error: null
}

const caseReducer = (state=initialState, {type, payload}) => {
  switch(type){
    case CREATE_CASE_REQUEST: {
      return {...state, loading: true}
    }
    case CREATE_CASE_SUCCESS: {
      return {...state, loading: false}
    }
    case CREATE_CASE_ERROR: {
      return {...state, loading: false, error: payload.error}
    }
    case CREATE_CASE_FOLDER_REQUEST: {
      return {...state, loading: true}
    }
    case CREATE_CASE_FOLDER_SUCCESS: {
      return {...state, loading: false}
    }
    case CREATE_CASE_FOLDER_ERROR: {
      return {...state, loading: false, error: payload.error}
    }
    default: {
      return state
    }
  }
}