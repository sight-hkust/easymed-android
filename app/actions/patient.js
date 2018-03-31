import { 
  CREATE_PATIENT_REQUEST,
  CREATE_PATIENT_RESET,
  SEARCH_PATIENT_REQUEST,
  FETCH_PATIENT_LIST_REQUEST,
  FETCH_PATIENT_QUEUE_REQUEST,
  QUEUE_PATIENT_REQUEST,
} from './constants';
  
  
export const createPatient = (profile, tag) => ({
  type: CREATE_PATIENT_REQUEST,
  payload: { profile, tag }
})

export const instantiate = () => ({
  type: CREATE_PATIENT_RESET
})

export const fetchPatientList = () => ({
  type: FETCH_PATIENT_LIST_REQUEST
})

export const fetchPatientQueue = (stage) => ({
  type: FETCH_PATIENT_QUEUE_REQUEST,
  payload: {stage}
})

export const queuePatient = (tag, patientId, stage) => ({
  type: QUEUE_PATIENT_REQUEST,
  payload: {tag, patientId, stage}
})