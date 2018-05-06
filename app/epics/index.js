import { combineEpics } from 'redux-observable'
import { registerEpic, loginEpic, logoutEpic } from '../epics/auth'
import { 
    createPatientEpic,
    queuePatientEpic,
    transferPatientEpic,
    fetchPatientListEpic,
    fetchPatientQueueEpic
} from './patients'
import {
    attachMetadataEpic,
    addVitalsRecordEpic,
    addChiefComplaintsEpic,
    addGynaecologyRecordEpic,
    updateMedicalHistoryEpic,
    updateScreeningResultEpic,
    updateMedicalConditionEpic
} from './records'

export const epics = combineEpics (
    registerEpic,
    loginEpic,
    logoutEpic,
    createPatientEpic,
    queuePatientEpic,
    transferPatientEpic,
    fetchPatientListEpic,
    fetchPatientQueueEpic,
    attachMetadataEpic,
    addVitalsRecordEpic,
    addChiefComplaintsEpic,
    addGynaecologyRecordEpic,
    updateMedicalHistoryEpic,
    updateScreeningResultEpic,
    updateMedicalConditionEpic
)

export default epics