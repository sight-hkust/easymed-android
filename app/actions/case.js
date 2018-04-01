import {
    CREATE_CASE_REQUEST,
    CREATE_CASE_SUCCESS,
    CREATE_CASE_ERROR
} from './constants'

export const createCase = (session) => ({
    type: CREATE_CASE_REQUEST,
    payload: { session }
})
