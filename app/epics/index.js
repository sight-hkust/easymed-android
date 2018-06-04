import { combineEpics } from 'redux-observable';
import { registerEpic, loginEpic, logoutEpic } from '../epics/auth';
import { 
    createPatientEpic,
    queuePatientEpic,
    transferPatientEpic,
    fetchPatientListEpic,
    fetchPatientQueueEpic
} from './patients';
import {
    fetchMedicalRecordsEpic,
    attachMetadataEpic,
    addVitalsRecordEpic,
    addChiefComplaintsEpic,
    addGynaecologyRecordEpic,
    updateMedicalHistoryEpic,
    updateScreeningResultEpic,
    updateMedicalConditionEpic
} from './records';
import { fetchMedicinesEpic } from './medicine';

export const epics = combineEpics (
    registerEpic,
    loginEpic,
    logoutEpic,
    createPatientEpic,
    queuePatientEpic,
    transferPatientEpic,
    fetchPatientListEpic,
    fetchPatientQueueEpic,
    fetchMedicalRecordsEpic,
    fetchMedicinesEpic,
    attachMetadataEpic,
    addVitalsRecordEpic,
    addChiefComplaintsEpic,
    addGynaecologyRecordEpic,
    updateMedicalHistoryEpic,
    updateScreeningResultEpic,
    updateMedicalConditionEpic,
)

export default epics