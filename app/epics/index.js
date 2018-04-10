import { combineEpics } from 'redux-observable'
import { registerEpic, loginEpic, logoutEpic } from '../epics/auth'
import { 
    createPatientEpic,
    queuePatientEpic,
    transferPatientEpic,
    fetchPatientListEpic,
    fetchPatientQueueEpic
} from './patients'

export const epics = combineEpics (
    registerEpic,
    loginEpic,
    logoutEpic,
    createPatientEpic,
    queuePatientEpic,
    transferPatientEpic,
    fetchPatientListEpic,
    fetchPatientQueueEpic
)

export default epics