import { 
    CREATE_VITALS_REQUEST,
    CREATE_VITALS_SUCCESS,
    CREATE_VITALS_ERROR
  } from '../actions/constants';
  import { createPatient, insertVitalsRecord } from '../services/api'
  import { ActionsObservable } from 'redux-observable'
  import { Observable } from 'rxjs';
  import 'rxjs/add/operator/concatMap';
  import 'rxjs/add/operator/map';
  import 'rxjs/add/operator/catch'
  
  const vitalsEpic = action$ => 
    action$.ofType(CREATE_VITALS_REQUEST).concatMap(({payload}) => {
      const { vitals } = payload
      return Observable.fromPromise(insertVitalsRecord(vitals))
    })
    .map(recordid => ({type: CREATE_VITALS_SUCCESS, payload: {recordid} }))
    .catch(error => Observable.of({type: CREATE_VITALS_ERROR, payload: {error}}))
  
  export { vitalsEpic }