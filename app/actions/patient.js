import { 
  CREATE_PATIENT_REQUEST,
  CREATE_PATIENT_SUCCESS,
  CREATE_PATIENT_ERROR,
  SEARCH_PATIENT_REQUEST,
  SEARCH_PATIENT_SUCCESS,
  SEARCH_PATIENT_ERROR
} from './constants';
  
  
export const createPatient = (profile) => ({
  type: CREATE_PATIENT_REQUEST,
  payload: { profile }
})