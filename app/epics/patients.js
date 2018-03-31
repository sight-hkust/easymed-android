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
  CREATE_PATIENT_ERROR
} from '../actions/constants';
import { createPatient, fetchPatients, fetchPatientQueue, queuePatient } from '../services/api'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const createPatientEpic = action$ => 
  action$.ofType(CREATE_PATIENT_REQUEST).concatMap(({payload}) => {
  const { profile, tag } = payload
  return Observable.fromPromise(createPatient(profile))
  })
  .map(patientId => ({type: CREATE_PATIENT_SUCCESS, payload: {patientId}}))
  .catch(error => Observable.of({type: CREATE_PATIENT_ERROR, payload: {error}}))

const fetchPatientListEpic = action$ => 
  action$.ofType(FETCH_PATIENT_LIST_REQUEST).concatMap(() => {
    return Observable.fromPromise(fetchPatients())
  })
  .map(patients => ({type: FETCH_PATIENT_LIST_SUCCESS, payload: {patients} }))
  .catch(error => Observable.of({type: FETCH_PATIENT_LIST_ERROR, payload: {error}}))

const fetchPatientQueueEpic = action$ => 
  action$.ofType(FETCH_PATIENT_QUEUE_REQUEST).concatMap(({payload}) => {
    const { stage } = payload
    return Observable.fromPromise(fetchPatientQueue(stage))
  })
  .map(patients => ({type: FETCH_PATIENT_QUEUE_SUCCESS, payload: {patients}}))
  .catch(error => Observable.of({type: FETCH_PATIENT_QUEUE_ERROR, payload: {error}}))

const queuePatientEpic = action$ =>
  action$.ofType(QUEUE_PATIENT_REQUEST).concatMap(({payload}) => {
    const { tag, patientId, stage } = payload
    console.log('hello')
    return Observable.fromPromise(queuePatient(tag, patientId, stage))
  })
  .map(({patient, queueId}) => ({type: QUEUE_PATIENT_SUCCESS, payload: {patient, queueId}}))
  .catch(error => Observable.of({type: QUEUE_PATIENT_ERROR, payload: {error}}))

export { createPatientEpic, fetchPatientListEpic, fetchPatientQueueEpic, queuePatientEpic }