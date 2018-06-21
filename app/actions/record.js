import {
  ADD_CASE_REQUEST,
  CREATE_CASE_FOLDER_REQUEST,
  ADD_VITALS_REQUEST,
  ADD_CHIEF_COMPLAINTS_REQUEST,
  ADD_GYNAECOLOGY_INFO_REQUEST,
  UPDATE_MEDICAL_HISTORY_REQUEST,
  UPDATE_SCREENING_RESULT_REQUEST,
  UPDATE_MEDICAL_CONDITION_REQUEST,
  ATTACH_METADATA_REQUEST,
  FETCH_MEDICAL_RECORDS_REQUEST,
  FETCH_MEDICINE_REQUEST,
  FETCH_MEDICAL_DIAGNOSIS_REQUEST,
  FETCH_PRESCRIPTION_REQUEST,
  FETCH_PATIENT_CASES_REQUEST
} from './constants'

export const addCase = (session, queueId) => ({
  type: ADD_CASE_REQUEST,
  payload: { session, queueId }
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

export const updateMedicalHistory = (history, patientId, queueId) => ({
  type: UPDATE_MEDICAL_HISTORY_REQUEST,
  payload: {history, patientId, queueId}
})

export const updateScreeningStatus = (screeningResult, patientId, queueId) => ({
  type: UPDATE_SCREENING_RESULT_REQUEST,
  payload: {screeningResult, patientId, queueId}
})

export const updateMedicalCondition = (conditions, patientId, queueId) => ({
  type: UPDATE_MEDICAL_CONDITION_REQUEST,
  payload: {conditions, patientId, queueId}
})

export const fetchPrescription = (queueId) => ({
  type: FETCH_PRESCRIPTION_REQUEST,
  payload: {queueId}
})

export const fetchMedicalRecords = (patientId) => ({
  type: FETCH_MEDICAL_RECORDS_REQUEST,
  payload: {patientId}
})

export const fetchMedicines = () => ({
  type: FETCH_MEDICINE_REQUEST
})

export const fetchMedicalDiagnosises = () => ({
  type: FETCH_MEDICAL_DIAGNOSIS_REQUEST
})

export const fetchPatientCases = (patientId) => ({
  type: FETCH_PATIENT_CASES_REQUEST,
  payload: {patientId}
})