import { 
    CREATE_PROFILE_REQUEST,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_ERROR
  } from '../actions/constants';
  import { createProfile } from '../services/api'
  import { ActionsObservable } from 'redux-observable'
  import { Observable } from 'rxjs';
  import 'rxjs/add/operator/concatMap';
  import 'rxjs/add/operator/map';
  
  const profileEpic = action$ => 
    action$.ofType(CREATE_PROFILE_REQUEST).concatMap(({payload}) => {
      const { name} = payload
      return Observable.fromPromise(register(username, password))
    }).map(isAuthenticated => ({type: isAuthenticated?AUTH_REGISTER_SUCCESS:AUTH_REGISTER_ERROR}))
  
  export {registerEpic}