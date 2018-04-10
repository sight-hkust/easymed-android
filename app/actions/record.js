import {
  CREATE_CASE_REQUEST,
  CREATE_CASE_FOLDER_REQUEST,
  INSERT_VITALS_REQUEST,
  UPDATE_MEDICAL_HISTORY_REQUEST,
  UPDATE_PREGNANCY_STATUS_REQUEST,
  UPDATE_MEDICAL_CONDITION_REQUEST,
  ATTACH_METADATA_REQUEST
} from './constants'

export const createCase = (session) => ({
  type: CREATE_CASE_REQUEST,
  payload: { session }
})

export const createFolder = (sessions, identifier) => ({
  type: CREATE_CASE_FOLDER_REQUEST,
  payload: {sessions, identifier}
})

export const insertVitals = (vitals, patientId) => ({
  type: INSERT_VITALS_REQUEST,
  payload: {vitals, patientId}
})

export const attachMetadata = (metadata, queueId) => ({
  type: ATTACH_METADATA_REQUEST,
  payload: {metadata, queueId}
})

export const updatePregnancyStatus = (pregnantStatus, patientId) => ({
  type: UPDATE_PREGNANCY_STATUS_REQUEST,
  payload: { pregnantStatus, patientId }
})

export const updateMedicalHistory = (history, patientId) => ({
  type: UPDATE_MEDICAL_HISTORY_REQUEST,
  payload: {history, patientId}
})

export const updateMedicalCondition = (conditions, patientId) => ({
  type: UPDATE_MEDICAL_CONDITION_REQUEST,
  payload: {conditions, patientId}
})