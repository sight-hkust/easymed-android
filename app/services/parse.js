import Parse from 'parse/react-native'
import { AsyncStorage } from 'react-native'

Parse.setAsyncStorage(AsyncStorage)
Parse.initialize('bWVkZWFzeXY0', 'b1ab52dd402daf76b3e588df99ec065220e3e44a688c14e8e5408fc0fe69f133')
Parse.serverURL = 'https://api.sight.ust.hk/parse'
// Parse.serverURL = 'http://10.0.3.14/parse'

export const Queue = Parse.Object.extend('Queue')

export const Patient = Parse.Object.extend('Patient')
export const Profile = Parse.Object.extend('Profile')
export const MedicalHistory = Parse.Object.extend('MedicalHistory')
export const MedicalCondition = Parse.Object.extend('MedicalCondition')
export const Gynaecology = Parse.Object.extend('Gynaecology')
export const ChiefComplaints = Parse.Object.extend('ChiefComplaints')
export const Vitals = Parse.Object.extend('Vitals')
export const Screening = Parse.Object.extend('Screening')
export const Medicine = Parse.Object.extend('Medicine')
export const Diagnosis = Parse.Object.extend('Diagnosis')
export const MedicalCase = Parse.Object.extend('MedicalCase')

export default Parse