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
  TRANSFER_PATIENT_ERROR
} from '../actions/constants';
import { createPatient, fetchPatients, fetchPatientQueue, queuePatient, transferPatient } from '../services/api'
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

const createPatientEpic = action$ =>
  action$.ofType(CREATE_PATIENT_REQUEST)
  .switchMap(({payload}) => {
    const { profile, tag } = payload
    return Observable.fromPromise(createPatient(profile))
    .mergeMap(patientId => ([createPatientSuccess(patientId), queuePatientRequest(tag, patientId, 'triage')]))
    .catch(error => Observable.of({type: CREATE_PATIENT_ERROR, payload: {error}}))
  })
  

const fetchPatientListEpic = action$ =>
  action$.ofType(FETCH_PATIENT_LIST_REQUEST)
  .switchMap(() => {
    return Observable.fromPromise(fetchPatients())
  })
  .map(patients => ({type: FETCH_PATIENT_LIST_SUCCESS, payload: {patients}}))
  .catch(error => Observable.of({type: FETCH_PATIENT_LIST_ERROR, payload: {error}}))

const fetchPatientQueueEpic = action$ =>
  action$.ofType(FETCH_PATIENT_QUEUE_REQUEST)
  .switchMap(({payload}) => {
    const { stage } = payload
    return Observable.fromPromise(fetchPatientQueue(stage))
  })
  .map(patients => ({type: FETCH_PATIENT_QUEUE_SUCCESS, payload: {patients}}))
  .catch(error => Observable.of({type: FETCH_PATIENT_QUEUE_ERROR, payload: {error}}))

const queuePatientEpic = action$ =>
  action$.ofType(QUEUE_PATIENT_REQUEST)
  .switchMap(({payload}) => {
    const { tag, patientId, stage } = payload
    return Observable.fromPromise(queuePatient(tag, patientId, stage))
  })
  .map((patient) => ({type: QUEUE_PATIENT_SUCCESS, payload: patient}))
  .catch(error => Observable.of({type: QUEUE_PATIENT_ERROR, payload: {error}}))

const transferPatientEpic = action$ =>
  action$.ofType(TRANSFER_PATIENT_REQUEST)
  .switchMap(({payload}) => {
    const { stage, queueId } = payload
    return Observable.fromPromise(transferPatient(queueId, stage))
  })
  .map(queueId => ({type: TRANSFER_PATIENT_SUCCESS, payload: {queueId}}))
  .catch(error => Observable.of({type: TRANSFER_PATIENT_ERROR, payload: {error}}))

export { 
  createPatientEpic,
  fetchPatientListEpic,
  fetchPatientQueueEpic,
  queuePatientEpic,
  transferPatientEpic
}