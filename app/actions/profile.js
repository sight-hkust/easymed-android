import { 
    CREATE_PROFILE_REQUEST,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_ERROR,
    SEARCH_PROFILE_REQUEST,
    SEARCH_PROFILE_SUCCESS,
    SEARCH_PROFILE_ERROR
  } from '../actions/constants';
  
  
  export const createProfile = (profile) => ({
    type: CREATE_PROFILE_REQUEST,
    payload: { profile }
  })