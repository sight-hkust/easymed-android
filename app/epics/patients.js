import { 
  FETCH_PATIENT_LIST_REQUEST,
  FETCH_PATIENT_LIST_SUCCESS,
  FETCH_PATIENT_LIST_ERROR,
  FETCH_PATIENT_QUEUE_REQUEST,
  FETCH_PATIENT_QUEUE_SUCCESS,
  FETCH_PATIENT_QUEUE_ERROR,
  QUEUE_PATIENT_REQUEST,
  QUEUE_PATIENT_SUCCESS,
  QUEUE_PATIENT_ERROR,
  CREATE_PATIENT_REQUEST,
  CREATE_PATIENT_SUCCESS,
  CREATE_PATIENT_ERROR,
  TRANSFER_PATIENT_REQUEST,
  TRANSFER_PATIENT_SUCCESS,
  TRANSFER_PATIENT_ERROR,
  DISCHARGE_PATIENT_REQUEST,
  DISCHARGE_PATIENT_SUCCESS,
  DISCHARGE_PATIENT_ERROR
} from '../actions/constants';
import { createPatient, fetchPatients, fetchPatientQueue, queuePatient, transferPatient, dischargePatient } from '../services/api'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { queuePatient as queuePatientRequest } from '../actions/patient'
const createPatientSuccess = (patientId) => ({
  type: CREATE_PATIENT_SUCCESS,
  payload: { patientId }
})

export const createPatientEpic = action$ =>
  action$.ofType(CREATE_PATIENT_REQUEST)
  .switchMap(({payload: {profile, tag, picture}}) => Observable.fromPromise(createPatient(profile))
  .mergeMap(patientId => ([createPatientSuccess(patientId), queuePatientRequest(tag, picture, patientId, 'triage')]))
  .catch(error => Observable.of({type: CREATE_PATIENT_ERROR, payload: {error}}))
  )
  

export const fetchPatientListEpic = action$ =>
  action$.ofType(FETCH_PATIENT_LIST_REQUEST)
  .switchMap(() => Observable.fromPromise(fetchPatients())
  .map(patients => ({type: FETCH_PATIENT_LIST_SUCCESS, payload: {patients}}))
  .catch(error => Observable.of({type: FETCH_PATIENT_LIST_ERROR, payload: {error}}))
  )

export const fetchPatientQueueEpic = action$ =>
  action$.ofType(FETCH_PATIENT_QUEUE_REQUEST)
  .switchMap(({payload: {stage}}) => Observable.fromPromise(fetchPatientQueue(stage))
  .map(patients => ({type: FETCH_PATIENT_QUEUE_SUCCESS, payload: {patients}}))
  .catch(error => Observable.of({type: FETCH_PATIENT_QUEUE_ERROR, payload: {error}}))
  )

export const queuePatientEpic = action$ =>
  action$.ofType(QUEUE_PATIENT_REQUEST)
  .switchMap(({payload: {tag, picture, patientId, stage}}) => Observable.fromPromise(queuePatient(tag, picture, patientId, stage))
  .map((patient) => ({type: QUEUE_PATIENT_SUCCESS, payload: patient}))
  .catch(error => Observable.of({type: QUEUE_PATIENT_ERROR, payload: {error}}))
)

export const transferPatientEpic = action$ =>
  action$.ofType(TRANSFER_PATIENT_REQUEST)
  .switchMap(({payload: {stage, queueId}}) => Observable.fromPromise(transferPatient(queueId, stage))
  .map(queueId => ({type: TRANSFER_PATIENT_SUCCESS, payload: {queueId}}))
  .catch(error => Observable.of({type: TRANSFER_PATIENT_ERROR, payload: {error}}))
  )

export const dischargePatientEpic = action$ =>
  action$.ofType(DISCHARGE_PATIENT_REQUEST)
  .switchMap( ({payload: {queueId}}) => Observable.fromPromise(dischargePatient)
  .map((queueId) => ({type: DISCHARGE_PATIENT_SUCCESS, payload: {queueId}}))
  .catch(error => Observable.of({type: DISCHARGE_PATIENT_ERROR, payload: {error}}))
  )