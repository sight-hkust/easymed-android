import { combineEpics } from 'redux-observable'
import { registerEpic, loginEpic, logoutEpic } from '../epics/auth'
import { profileEpic } from './profile'
import { vitalsEpic } from './vitals'
import { fetchPatientListEpic } from './patients'

export const epics = combineEpics (
    registerEpic,
    loginEpic,
    logoutEpic,
    profileEpic,
    vitalsEpic,
    fetchPatientListEpic
)

export default epics