import Parse from './parse';

async function register(username, password){
  const user = new Parse.User()
  user.set('username', username)
  user.set('password', password)
  try {
    await user.signUp()
    return user.authenticated()
  } catch (error) {
    throw error
  }
}

async function authenticate(username, password){
  try {
    const user = await Parse.User.logIn(username, password)
    return user.authenticated()
  } catch (error) {
    throw error
  }
}

async function deauthenticate(){
  try {
    await Parse.User.logOut()
    return !(Parse.User.current() === null)
  } catch (error) {
    throw error
  }
}

async function createPatient(profile){
  const Patient = Parse.Object.extend('Patient')
  const Profile = Parse.Object.extend('Profile')
  let _profile = new Profile()
  Object.keys(profile).forEach(attribute => _profile.set(attribute, profile[attribute]))
  let _patient = new Patient()
  _patient.set('profile', _profile)
  try {
    await Promise.all([_profile.save(), _patient.save()])
    return _patient.id
  } catch (error) {
    console.log(error)
    throw error
  }
}

// async function queuePatient(patientId) {
//   const Queue = Parse.Object.extend('Queue')
// }

async function fetchMedicines() {
  const Medicine = Parse.Object.extend('Medicine')
  const query = new Parse.Query(Medicine)
  try {
    const result = await query.find()
    return result.map((medicine) => medicine.attributes)
  } catch (error) {
    throw error
  }
}

async function fetchDiagnosis() {
  const Diagnosis = Parse.Object.extend('Diagnosis')
  const query = new Parse.Query(Diagnosis)
  try {
    const result = await query.find()
    return result.map((diagnosis) => diagnosis.attributes)
  } catch (error) {
    throw error
  }
}

async function fetchPatients() {
  const Patient = Parse.Object.extend('Patient')
  const Profile = Parse.Object.extend('Profile')
  const query = new Parse.Query(Patient)
  try {
    const result = await query.find()
    const patients = await Promise.all([...result.map(async (patient) => {
      const profileQuery = new Parse.Query(Profile)
      const profile = (await profileQuery.get(patient.attributes.profile.id)).attributes
      return {
        ...profile,
        id: patient.id,
        age: new Date().getFullYear() - new Date(profile.dob).getFullYear()
      }
    })])
    return patients
  } catch (error) {
    throw error
  }
}

async function fetchPatientQueue(stage) {
  const Queue = Parse.Object.extend('Queue')
  const query = new Parse.Query(Queue)
  query.equalTo('stage', stage)
  try {
    const result = await query.find()
    const patients = await Promise.all([...result.map(async ({queueId, attributes: {patient, tag}}) => {
      const {id} = patient.attributes.profile
      const profile = await findProfile(id)
      return {patient: {...profile, tag, id: patient.id}, queueId}
    })])
    return patients
  } catch (error) {
    
  }
}

async function queuePatient(tag, patientId, stage) {
  try {
    const Queue = Parse.Object.extend('Queue')
    const Patient = Parse.Object.extend('Patient')
    const _patient = await new Parse.Query(Patient).get(patientId)
    const enlisting = new Queue()
    enlisting.set('stage', stage)
    enlisting.set('patient', _patient)
    enlisting.set('tag', Math.abs(tag))
    await enlisting.save()
    const profile = await findProfile(_patient.attributes.profile.id)
    return {patient: {...profile, tag, id: patientId}, queueId: enlisting.id}
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function findProfile(id) {
  try {
    const Profile = Parse.Object.extend('Profile')
    const _profile = (await new Parse.Query(Profile).get(id)).attributes
    return {..._profile, age: new Date().getFullYear() - new Date(_profile.dob).getFullYear()}
  } catch (error) {
    
  }
}

async function findPatient(patientId) {
  try {
    const Patient = Parse.Object.extend('Patient')
    const _patient = await new Parse.Query(Patient).get(patientId)
    return _patient
  } catch (error) {
    throw error
  }
}

async function insertMedicalHistory(history, patientId) {
  try {
    const History = Parse.Object.extend('History')
    const record = new History()
    Object.keys(history).forEach(attribute => record.set(attribute, history[attribute]))
    const patient = await findPatient(patientId)
    patient.set('history', history)
    await Promise.all([history.save(), patient.save()])
  } catch (error) {
    throw error
  }
}

async function insertVitalsRecord(data) {
  try {
    const Vitals = Parse.Object.extend('Vitals')
    const record = new Vitals()
    Object.keys(data).forEach(attribute => record.set(attribute, data[attribute]))
    await record.save()
    return record.id
  } catch (error) {
    throw error
  }
}

async function addMedicalCase(records, patientId) {
  try {
    const patient = await findPatient(patientId)
    const relation = patient.relation('cases')
    const Case = Parse.Object.extend('Case')
    const _case = new Case()
    Object.keys(records).forEach(attribute => _case.set(attribute, records[attribute]))
    relation.add(_case)
    await Promise.all([_case.save(), patient.save()])
  } catch (error) {
    throw error
  }
}

export {
  register,
  authenticate,
  deauthenticate,
  insertVitalsRecord,
  insertMedicalHistory,
  createPatient,
  queuePatient,
  fetchPatients,
  fetchPatientQueue,
  fetchDiagnosis,
  fetchMedicines
}