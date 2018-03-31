import { combineEpics } from 'redux-observable'
import { registerEpic, loginEpic, logoutEpic } from '../epics/auth'
import { 
    createPatientEpic,
    queuePatientEpic,
    fetchPatientListEpic,
    fetchPatientQueueEpic
} from './patients'
import { vitalsEpic } from './vitals'

export const epics = combineEpics (
    registerEpic,
    loginEpic,
    logoutEpic,
    vitalsEpic,
    createPatientEpic,
    queuePatientEpic,
    fetchPatientListEpic,
    fetchPatientQueueEpic
)

export default epics