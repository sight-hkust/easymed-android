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
    return true
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

async function find(patientId) {
  try {
    const patient = Parse.Query.get(patientId)
    return patient
  } catch (error) {
    throw error
  }
}

async function insertMedicalHistory(history, patientId) {
  try {
    const History = Parse.Object.extend('History')
    const record = new History()
    Object.keys(history).forEach(attribute => record.set(attribute, history[attribute]))
    const patient = await find(patientId)
    patient.set('history', history)
    await Promise.all([history.save(), patient.save()])
  } catch (error) {
    throw error
  }
}

async function insertVitalsRecord(vitals) {
  try {
    const Vitals = Parse.Object.extend('Vitals')
    const record = new Vitals()
    Object.keys(vitals).forEach(attribute => record.set(attribute, vitals[attribute]))
    await record.save()
    return record.id
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