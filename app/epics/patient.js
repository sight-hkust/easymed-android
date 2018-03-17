import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';

import {
    CREATE_PATIENT_REQUEST,
    CREATE_PATIENT_SUCCESS,
    CREATE_PATIENT_ERROR,
    SEARCH_PATIENT_REQUEST,
    SEARCH_PATIENT_SUCCESS,
    SEARCH_PATIENT_ERROR
} from '../actions/constants';

import {
    createPatient, searchPatient, createPatientSuccess, createPatientError,
    searchPatientSuccess, searchPatientError
} from '../actions/patient';

const createPatientEpic = action$ =>
    action$.ofType(CREATE_PATIENT_REQUEST)
    .mergeMap(action =>
      ajax.getJSON(`https://api.github.com/users/${action.payload}`)
        .map(response => createPatientSuccess(response))
        .catch(error => Observable.of(createPatientError(error)))
);

const searchPatientEpic = action$ =>
    action$.ofType('SEARCH_PATIENT_REQUEST')
        .debounceTime(500)
        .mergeMap(({payload}) =>
            Observable.ajax({
                method: 'PATCH',
                url: payload.url,
                body: JSON.stringify(payload),
            })
            .map(resp => savingSuccess(resp))
            .catch(error => Observable.of(searchPatientError(error)))
        );

export default searchPatientEpic;
export default createPatientEpic;
