import { combineEpics } from 'redux-observable';
import { registerEpic, loginEpic, logoutEpic } from '../epics/auth';
import { 
    createPatientEpic,
    queuePatientEpic,
    transferPatientEpic,
    fetchPatientListEpic,
    fetchPatientQueueEpic,
    dischargePatientEpic
} from './patients';
import {
    fetchPrescriptionsEpic,
    fetchMedicalRecordsEpic,
    attachMetadataEpic,
    addVitalsRecordEpic,
    addChiefComplaintsEpic,
    addGynaecologyRecordEpic,
    updateMedicalHistoryEpic,
    updateScreeningResultEpic,
    updateMedicalConditionEpic,
    fetchDiagnosisesEpic,
    addMedicalCaseEpic
} from './records';
import { fetchMedicinesEpic } from './medicine';

export const epics = combineEpics (
    registerEpic,
    loginEpic,
    logoutEpic,
    createPatientEpic,
    queuePatientEpic,
    dischargePatientEpic,
    transferPatientEpic,
    fetchPatientListEpic,
    fetchPatientQueueEpic,
    fetchMedicalRecordsEpic,
    fetchMedicinesEpic,
    fetchDiagnosisesEpic,
    fetchPrescriptionsEpic,
    attachMetadataEpic,
    addVitalsRecordEpic,
    addChiefComplaintsEpic,
    addGynaecologyRecordEpic,
    updateMedicalHistoryEpic,
    updateScreeningResultEpic,
    updateMedicalConditionEpic,
    addMedicalCaseEpic
)

export default epics