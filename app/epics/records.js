import { 
  ADD_VITALS_REQUEST,
  ADD_VITALS_SUCCESS,
  ADD_VITALS_ERROR,
  ATTACH_METADATA_REQUEST,
  ATTACH_METADATA_SUCCESS,
  ATTACH_METADATA_ERROR,
  UPDATE_MEDICAL_CONDITION_SUCCESS,
  UPDATE_MEDICAL_CONDITION_REQUEST,
  UPDATE_MEDICAL_CONDITION_ERROR,
  ADD_GYNAECOLOGY_INFO_REQUEST,
  ADD_GYNAECOLOGY_INFO_ERROR,
  ADD_GYNAECOLOGY_INFO_SUCCESS,
  UPDATE_SCREENING_RESULT_REQUEST,
  UPDATE_SCREENING_RESULT_ERROR,
  UPDATE_SCREENING_RESULT_SUCCESS,
  UPDATE_MEDICAL_HISTORY_ERROR,
  UPDATE_MEDICAL_HISTORY_REQUEST,
  UPDATE_MEDICAL_HISTORY_SUCCESS,
  ADD_CHIEF_COMPLAINTS_REQUEST,
  ADD_CHIEF_COMPLAINTS_SUCCESS,
  FETCH_MEDICAL_RECORDS_REQUEST,
  FETCH_MEDICAL_RECORDS_SUCCESS,
  FETCH_MEDICAL_RECORDS_ERROR,
  FETCH_MEDICAL_DIAGNOSIS_SUCCESS,
  FETCH_MEDICAL_DIAGNOSIS_REQUEST,
  FETCH_MEDICAL_DIAGNOSIS_ERROR,
  ADD_MEDICAL_DIAGNOSIS_REQUEST,
  ADD_MEDICAL_DIAGNOSIS_SUCCESS,
  ADD_MEDICAL_DIAGNOSIS_ERROR
} from '../actions/constants';
import { 
  fetchMedicalRecords,
  fetchDiagnosises,
  updateMedicalHistory,
  updateScreeningResult,
  updateMedicalConditions,
  insertVitalsRecord,
  insertChiefComplaintsRecord,
  insertGynaecologyRecord,
  attachMetadata
} from '../services/api'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

export const submitAttachment = (recordId, recordType, queueId) => ({
  type: ATTACH_METADATA_REQUEST,
  payload: {recordId, recordType, queueId}
})

export const addVitalsSuccess = (recordId) => ({
  type: ADD_VITALS_SUCCESS,
  payload: {recordId}
})

export const addGynaecologyInfoSuccess = (recordId) => ({
  type: ADD_GYNAECOLOGY_INFO_SUCCESS,
  payload: {recordId}
})

export const addChiefComplaintsSuccess = (recordId) => ({
  type: ADD_CHIEF_COMPLAINTS_SUCCESS,
  payload: {recordId}
})

export const checkTriageItem = (queueId, item) => ({
  type: CHECK_TRIAGE_ITEM,
  payload: {queueId, item}
})

export const fetchMedicalRecordsEpic = action$ =>
  action$.ofType(FETCH_MEDICAL_RECORDS_REQUEST)
  .switchMap(({payload: {patientId}}) => Observable.fromPromise(fetchMedicalRecords(patientId))
  .map(records => ({type: FETCH_MEDICAL_RECORDS_SUCCESS, payload: records}))
  .catch(error => Observable.of({type: FETCH_MEDICAL_RECORDS_ERROR, payload: {error}}))
  )

export const attachMetadataEpic = action$ =>
  action$.ofType(ATTACH_METADATA_REQUEST)
  .switchMap(({payload: {recordId, recordType, queueId}}) => {
    return Observable.fromPromise(attachMetadata(recordId, recordType, queueId))
    .map(queueId => ({type: ATTACH_METADATA_SUCCESS, payload: {queueId}}))
    .catch(error => Observable.of({type: ATTACH_METADATA_ERROR, payload: { error }}))
  }
  )

export const addVitalsRecordEpic = action$ =>
  action$.ofType(ADD_VITALS_REQUEST)
  .switchMap(({payload: {vitals, patientId, queueId}}) => Observable.fromPromise(insertVitalsRecord(vitals))
  .mergeMap(recordId => [addVitalsSuccess(recordId), submitAttachment(recordId, 'vitals', queueId), checkTriageItem(queueId, 'vitals')])
  .catch(error => Observable.of({type: ADD_VITALS_ERROR, payload: {error}}))
  )

export const addGynaecologyRecordEpic = action$ =>
  action$.ofType(ADD_GYNAECOLOGY_INFO_REQUEST)
  .switchMap(({payload: {gynaecologyInfo, queueId}}) => Observable.fromPromise(insertGynaecologyRecord(gynaecologyInfo))
  .mergeMap(recordId => [addGynaecologyInfoSuccess(recordId), submitAttachment(recordId, 'gynaecology', queueId), checkTriageItem(queueId, 'gynaecology')])
  .catch(error => Observable.of({type: ADD_GYNAECOLOGY_INFO_ERROR, payload: {error}}))
  )

export const addChiefComplaintsEpic = action$ =>
  action$.ofType(ADD_CHIEF_COMPLAINTS_REQUEST)
  .switchMap(({payload: {description, queueId}}) => Observable.fromPromise(insertChiefComplaintsRecord(description))
  .mergeMap(recordId => [addChiefComplaintsSuccess(recordId), submitAttachment(recordId, 'cc', queueId), checkTriageItem(queueId, 'cc')])
  .catch(error => Observable.of({type: ADD_CHIEF_COMPLAINTS_ERROR, payload: {error}}))
  )

export const updateMedicalHistoryEpic = action$ =>
  action$.ofType(UPDATE_MEDICAL_HISTORY_REQUEST)
  .switchMap(({payload: {history, patientId}}) => Observable.fromPromise(updateMedicalHistory(history, patientId))
  .mergeMap(recordId => [{type: UPDATE_MEDICAL_HISTORY_SUCCESS, payload: {recordId}}, checkTriageItem(queueId, 'pmh')])
  .catch(error => Observable.of({type: UPDATE_MEDICAL_HISTORY_ERROR, payload: {error}}))
  )

export const updateScreeningResultEpic = action$ =>
  action$.ofType(UPDATE_SCREENING_RESULT_REQUEST)
  .switchMap(({payload: {screeningResult, patientId}}) => Observable.fromPromise(updateScreeningResult(screeningResult, patientId))
  .mergeMap(recordId => [{type: UPDATE_SCREENING_RESULT_SUCCESS, payload: {recordId}}, checkTriageItem(queueId, 'screening')])
  .catch(error => Observable.of({type: UPDATE_SCREENING_RESULT_ERROR, payload: {error}}))
  )

export const updateMedicalConditionEpic = action$ =>
  action$.ofType(UPDATE_MEDICAL_CONDITION_REQUEST)
  .switchMap(({payload: {conditions, patientId}}) => Observable.fromPromise(updateMedicalConditions(conditions, patientId))
  .mergeMap(recordId => [{type: UPDATE_MEDICAL_CONDITION_SUCCESS, payload: {recordId}}, checkTriageItem(queueId, 'misc')])
  .catch(error => Observable.of({type: UPDATE_MEDICAL_CONDITION_ERROR, payload: {error}}))
  )

export const fetchDiagnosisesEpic = action$ =>
  action$.ofType(FETCH_MEDICAL_DIAGNOSIS_REQUEST)
  .switchMap(() => Observable.fromPromise(fetchDiagnosises())
  .map(diagnosises => ({type: FETCH_MEDICAL_DIAGNOSIS_SUCCESS, payload: {diagnosises}}))
  .catch(error => Observable.of({type: FETCH_MEDICAL_DIAGNOSIS_ERROR, payload: {error}}))
  )

// export const addDiagnosisEpic = action$ =>
//   action$.ofType(ADD_MEDICAL_DIAGNOSIS_REQUEST)
//   .switchMap(({payload: {diagnosis}}))