import { 
    CREATE_PROFILE_REQUEST,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_ERROR
  } from '../actions/constants';
  import { createPatient } from '../services/api'
  import { ActionsObservable } from 'redux-observable'
  import { Observable } from 'rxjs';
  import 'rxjs/add/operator/concatMap';
  import 'rxjs/add/operator/map';
  import 'rxjs/add/operator/catch'
  
  const profileEpic = action$ => 
    action$.ofType(CREATE_PROFILE_REQUEST).concatMap(({payload}) => {
      const { profile } = payload
      return Observable.fromPromise(createPatient(profile))
    })
    .map(patientid => ({type: CREATE_PROFILE_SUCCESS, payload: {patientid} }))
    .catch(error => Observable.of({type: CREATE_PROFILE_ERROR, payload: {error}}))
  
  export { profileEpic }