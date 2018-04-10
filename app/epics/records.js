import { 
  INSERT_VITALS_REQUEST,
  INSERT_VITALS_SUCCESS,
  INSERT_VITALS_ERROR,
  ATTACH_METADATA_REQUEST,
  ATTACH_METADATA_SUCCESS,
  ATTACH_METADATA_ERROR,
  UPDATE_MEDICAL_CONDITION_SUCCESS,
  UPDATE_MEDICAL_CONDITION_REQUEST,
  UPDATE_MEDICAL_CONDITION_ERROR,
  UPDATE_PREGNANCY_STATUS_REQUEST,
  UPDATE_PREGNANCY_STATUS_SUCCESS,
  UPDATE_PREGNANCY_STATUS_ERROR
} from '../actions/constants';
import { createPatient, insertVitalsRecord } from '../services/api'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

const attachMetadataEpic = action$ =>
  action$.ofType(ATTACH_METADATA_REQUEST).concatMap(({payload}) => {
    return Observable.fromPromise()
  })
  .map()

const vitalsEpic = action$ => 
  action$.ofType(CREATE_VITALS_REQUEST).concatMap(({payload}) => {
    const { vitals } = payload
    return Observable.fromPromise(insertVitalsRecord(vitals))
  })
  .map(recordid => ({type: CREATE_VITALS_SUCCESS, payload: {recordid} }))
  .catch(error => Observable.of({type: CREATE_VITALS_ERROR, payload: {error}}))

export { vitalsEpic }