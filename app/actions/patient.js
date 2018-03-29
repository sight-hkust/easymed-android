import { 
  CREATE_PATIENT_REQUEST,
  SEARCH_PATIENT_REQUEST,
  FETCH_PATIENT_LIST_REQUEST,
  FETCH_PATIENT_QUEUE_REQUEST,
  QUEUE_PATIENT_REQUEST,
} from './constants';
  
  
export const createPatient = (profile) => ({
  type: CREATE_PATIENT_REQUEST,
  payload: { profile }
})

export const fetchPatientList = () => ({
  type: FETCH_PATIENT_LIST_REQUEST
})

export const fetchPatientInQueue = () => ({
  type: FETCH_PATIENT_QUEUE_REQUEST
})

export const queuePatient = () => ({
  type: QUEUE_PATIENT_REQUEST
})