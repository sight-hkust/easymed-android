import {
  FETCH_MEDICINE_REQUEST,
  FETCH_MEDICINE_SUCCESS,
  FETCH_MEDICINE_ERROR,
  FETCH_PRESCRIPTION_REQUEST
} from '../actions/constants'
import { fetchMedicines } from '../services/api'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export const fetchMedicinesEpic = action$ =>
  action$.ofType(FETCH_MEDICINE_REQUEST)
  .switchMap(() => Observable.fromPromise(fetchMedicines())
  .map(medicines => ({type: FETCH_MEDICINE_SUCCESS, payload: {medicines}}))
  .catch(error => Observable.of({type: FETCH_MEDICINE_ERROR, payload: {error}}))
  )