import {
  CREATE_CASE_REQUEST,
  CREATE_CASE_FOLDER_REQUEST,
  ADD_VITALS_REQUEST,
  ADD_CHIEF_COMPLAINTS_REQUEST,
  ADD_GYNAECOLOGY_INFO_REQUEST,
  UPDATE_MEDICAL_HISTORY_REQUEST,
  UPDATE_SCREENING_RESULT_REQUEST,
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

export const addVitalsRecord = (vitals, queueId) => ({
  type: ADD_VITALS_REQUEST,
  payload: {vitals, queueId}
})

export const addChiefComplaints = (description, queueId) => ({
  type: ADD_CHIEF_COMPLAINTS_REQUEST,
  payload: {description, queueId}
})

export const attachMetadata = (recordId, recordType, queueId) => ({
  type: ATTACH_METADATA_REQUEST,
  payload: {recordId, recordType, queueId}
})

export const addGynaecologyInfo = (gynaecologyInfo, queueId) => ({
  type: ADD_GYNAECOLOGY_INFO_REQUEST,
  payload: { gynaecologyInfo, queueId }
})

export const updateMedicalHistory = (history, patientId) => ({
  type: UPDATE_MEDICAL_HISTORY_REQUEST,
  payload: {history, patientId}
})

export const updateScreeningStatus = (screeningResult, patientId) => ({
  type: UPDATE_SCREENING_RESULT_REQUEST,
  payload: {screeningResult, patientId}
})

export const updateMedicalCondition = (conditions, patientId) => ({
  type: UPDATE_MEDICAL_CONDITION_REQUEST,
  payload: {conditions, patientId}
})