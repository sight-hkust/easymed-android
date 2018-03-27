import { 
  CREATE_PATIENT_REQUEST,
  CREATE_PATIENT_SUCCESS,
  CREATE_PATIENT_ERROR
} from '../actions/constants';
  import { createPatient } from '../services/api'
  import { ActionsObservable } from 'redux-observable'
  import { Observable } from 'rxjs';
  import 'rxjs/add/operator/concatMap';
  import 'rxjs/add/operator/map';
  import 'rxjs/add/operator/catch'
  
const profileEpic = action$ => 
  action$.ofType(CREATE_PATIENT_REQUEST).concatMap(({payload}) => {
    const { profile } = payload
    return Observable.fromPromise(createPatient(profile))
  })
  .map(patientId => ({type: CREATE_PATIENT_SUCCESS, payload: {patientId} }))
  .catch(error => Observable.of({type: CREATE_PATIENT_ERROR, payload: {error}}))

export { profileEpic }