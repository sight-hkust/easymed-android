import {
  FETCH_MEDICINE_REQUEST,
  FETCH_MEDICINE_SUCCESS,
  FETCH_MEDICINE_ERROR
} from '../actions/constants'
import { fetchMedicines } from '../services/api'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

