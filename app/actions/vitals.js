import {
    CREATE_VITALS_REQUEST,
    CREATE_VITALS_SUCCESS,
    CREATE_VITALS_ERROR
} from './constants'

export const createVitals = (vitals) => ({
    type: CREATE_VITALS_REQUEST,
    payload: { vitals }
})