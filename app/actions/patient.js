import { 
  CREATE_PATIENT_REQUEST,
  CREATE_PATIENT_RESET,
  FETCH_PATIENT_LIST_REQUEST,
  FETCH_PATIENT_QUEUE_REQUEST,
  QUEUE_PATIENT_REQUEST,
  TRANSFER_PATIENT_REQUEST,
  RESET_PATIENT_QUEUE,
  DISCHARGE_PATIENT_REQUEST,
  TAG_QUEUED_PATIENT_LOCATION_REQUEST,
  SET_OPERATION_LOCATION
} from './constants';
  
export const setOperationLocation = (location) => ({
  type: SET_OPERATION_LOCATION,
  payload: {location}
})

export const createPatient = (profile, tag, picture) => ({
  type: CREATE_PATIENT_REQUEST,
  payload: { profile, tag, picture }
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

export const queuePatient = (tag, picture, patientId, stage) => ({
  type: QUEUE_PATIENT_REQUEST,
  payload: {tag, picture, patientId, stage}
})

export const tagQueuedPatientLocation = (queueId, location) => ({
  type: TAG_QUEUED_PATIENT_LOCATION_REQUEST,
  payload: {location, queueId}
})

export const transferPatient = (queueId, stage) => ({
  type: TRANSFER_PATIENT_REQUEST,
  payload: {queueId, stage}
})

export const dischargePatient = (queueId) => ({
  type: DISCHARGE_PATIENT_REQUEST,
  payload: {queueId}
})

export const resetPatientQueue = () => ({
  type: RESET_PATIENT_QUEUE
})