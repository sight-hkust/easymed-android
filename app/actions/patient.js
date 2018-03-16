import {
    CREATE_PATIENT_REQUEST,
    CREATE_PATIENT_SUCCESS,
    CREATE_PATIENT_ERROR,
    SEARCH_PATIENT_REQUEST,
    SEARCH_PATIENT_SUCCESS,
    SEARCH_PATIENT_ERROR
} from '../actions/constants';

export const createPatient = (...basicinfo ) => ({
    type: CREATE_PATIENT_REQUEST,
    payload: { ...basicinfo }
});

export const createPatientSuccess = createPatientSuccessMsg => ({
    type: CREATE_PATIENT_SUCCESS,
    payload: createPatientSuccessMsg
})

export const createPatientError = createPatientErrorMsg => ({
    type: CREATE_PATIENT_ERROR,
    payload: createPatientErrorMsg
});

export const searchPatient = (name, irisID) => ({
    type: SEARCH_PATIENT_REQUEST,
    payload: { name, irisID }
});

export const searchPatientSuccess = searchPatientSuccessMsg => ({
    type: SEARCH_PATIENT_SUCCESS,
    payload: searchPatientSuccessMsg
});

export const searchPatientError = searchPatientErrorMsg => ({
    type: SEARCH_PATIENT_ERROR,
    payload: searchPatientErrorMsg
});