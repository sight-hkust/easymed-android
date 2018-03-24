import Parse from './parse';

async function register(username, password){
  const user = new Parse.User()
  user.set('username', username)
  user.set('password', password)
  try {
    await user.signUp()
    return Parse.User.authenticated()
  } catch (error) {
    throw error
  }
}

async function authenticate(username, password){
  try {
    const user = await Parse.User.logIn(username, password)
    return Parse.User.authenticated()
  } catch (error) {
    throw error
  }
}

async function deauthenticate(){
  try {
    await Parse.User.logOut()
    return Parse.User.authenticated()
  } catch (error) {
    throw error
  }
}

async function createPatient(profile){
  const Patient = Parse.Object.extend('Patient')
  const Profile = Parse.Object.extend('Profile')
  const _patient = new Patient()
  const _profile = new Profile()
  Object.keys(_profile).forEach(attribute => _profile.set(attribute, profile[attribute]))
  patient.addUnique('profile', _profile)
  try {
    await Promise.all([_profile.save(), _patient.save()])
    return _patient.id
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
}