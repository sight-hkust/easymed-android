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
  let _patient = new Patient()
  _patient.set('profile', profile)
  try {
    await _patient.save()
    return _patient.id
  } catch (error) {
    console.log(error)
    throw error
  }
}

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
  const query = new Parse.Query(Patient)
  try {
    const result = await query.find()
    return result.map((patient) => ({
      ...patient.attributes.profile,
      id: patient.id,
      age: new Date().getFullYear() - new Date(patient.attributes.profile.dob).getFullYear()
    }))
  } catch (error) {
    throw error
  }
}

async function findPatient(patientId) {
  try {
    const Patient = Parse.Object.extend('Patient')
    const _patient = Parse.Query(Patient).get(patientId)
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
  fetchPatients,
  fetchDiagnosis,
  fetchMedicines
}