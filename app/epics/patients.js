import { 
  FETCH_PATIENT_LIST_REQUEST,
  FETCH_PATIENT_LIST_SUCCESS,
  FETCH_PATIENT_LIST_ERROR
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

export { fetchPatientListEpic }