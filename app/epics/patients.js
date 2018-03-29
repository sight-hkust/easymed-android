import { 
  FETCH_PATIENT_LIST_REQUEST,
  FETCH_PATIENT_LIST_SUCCESS,
  FETCH_PATIENT_LIST_ERROR,
  FETCH_PATIENT_QUEUE_REQUEST,
  FETCH_PATIENT_QUEUE_SUCCESS,
  FETCH_PATIENT_QUEUE_ERROR,
  QUEUE_PATIENT_REQUEST,
  QUEUE_PATIENT_SUCCESS,
  QUEUE_PATIENT_ERROR
} from '../actions/constants';
  import { fetchPatients } from '../services/api'
  import { ActionsObservable } from 'redux-observable'
  import { Observable } from 'rxjs';
  import 'rxjs/add/operator/concatMap';
  import 'rxjs/add/operator/map';
  import 'rxjs/add/operator/catch'
  
const fetchPatientListEpic = action$ => 
  action$.ofType(FETCH_PATIENT_LIST_REQUEST).concatMap(() => {
    return Observable.fromPromise(fetchPatients())
  })
  .map(patients => ({type: FETCH_PATIENT_LIST_SUCCESS, payload: {patients} }))
  .catch(error => Observable.of({type: FETCH_PATIENT_LIST_ERROR, payload: {error}}))

const fetchPatientQueueEpic = action$ => 
  action$.ofType(FETCH_PATIENT_QUEUE_REQUEST).concatMap(() => {
    return Observable.fromPromise(fetchPatientQueue())
  })
  .map(patients => ({type: FETCH_PATIENT_QUEUE_SUCCESS, payload: {patients}}))
  .catch(error => Observable.of({type: FETCH_PATIENT_QUEUE_ERROR, payload: {error}}))

const queuePatientEpic = action$ =>
  action$.ofType(QUEUE_PATIENT_REQUEST).concatMap(patientId => {
    return Observable.fromPromise(queuePatient())
  })
  .map(patientId => ({type: QUEUE_PATIENT_SUCCESS, payload: {patientId}}))
  .catch(error => Observable.of({type: QUEUE_PATIENT_ERROR, payload: {error}}))

export { fetchPatientListEpic, fetchPatientQueueEpic }