import Parse from './parse';

const register = async (username, password) => {
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

const authenticate = async (username, password) => {
  try {
    const user = await Parse.User.logIn(username, password)
    return user.authenticated()
  } catch (error) {
    throw error
  }
}

const deauthenticate = async () => {
  try {
    await Parse.User.logOut()
    return !(Parse.User.current() === null)
  } catch (error) {
    throw error
  }
}

const createPatient = async (profile) => {
  const Patient = Parse.Object.extend('Patient')
  const Profile = Parse.Object.extend('Profile')
  let _profile = new Profile()
  const picture = await new Parse.File(`${profile.name.regular}.JPG`, { base64: profile.picture }).save()
  Object.keys(profile).forEach(attribute => 
    attribute==='picture'?
    _profile.set(attribute, picture):
    _profile.set(attribute, profile[attribute])
  )
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

const fetchMedicines = async (name) => {
  const Medicine = Parse.Object.extend('Medicine')
  const query = new Parse.Query(Medicine)
  if(name){
    query.equalTo(name)
  }
  try {
    const result = await query.find()
    return result.map((medicine) => medicine.attributes)
  } catch (error) {
    throw error
  }
}

const fetchDiagnosis = async (name) => {
  const Diagnosis = Parse.Object.extend('Diagnosis')
  const query = new Parse.Query(Diagnosis)
  if(name){
    query.equalTo(name)
  }
  try {
    const result = await query.find()
    return result.map((diagnosis) => diagnosis.attributes)
  } catch (error) {
    throw error
  }
}

const fetchPatients = async () => {
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

const fetchPatientQueue = async (stage) => {
  const Queue = Parse.Object.extend('Queue')
  const query = new Parse.Query(Queue).equalTo('stage', stage)
  try {
    const result = await query.find()
    const patients = await Promise.all([...result.map(async ({id, attributes: {patient, tag}}) => {
      patient = await findPatient(patient.id)
      const profile = await findProfile(patient.attributes.profile.id)
      return {patient: {...profile, tag, id: patient.id}, queueId: id}
    })])
    return patients
  } catch (error) {
    throw error
  }
}

const updateMedicalHistory = async (history, patientId) => {
  try {
    const MedicalHistory = Parse.Object.extend('MedicalHistory')
    const _patient = await findPatient(patientId)
    const record = _patient.get('pmh')
    if(record){
      const previousMedicalHistory = await new Parse.Query(MedicalHistory).get(record.id)
      Object.keys(history).forEach(attribute => previousMedicalHistory.set(attribute, history[attribute])) 
      await previousMedicalHistory.save()
      return previousMedicalHistory.id
    }
    else {
      const previousMedicalHistory = new MedicalHistory()
      Object.keys(history).forEach(attribute => previousMedicalHistory.set(attribute, history[attribute])) 
      await previousMedicalHistory.save()
      _patient.set('pmh', previousMedicalHistory)
      _patient.save()
      return previousMedicalHistory.id
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const updateScreeningResult = async (screening, patientId) => {
  try {
    const Screening = Parse.Object.extend('Screening')
    const _patient = await findPatient(patientId)
    const record = _patient.get('screening')
    if(record){
      const screeningResult = await new Parse.Query(Screening).get(record.id)
      Object.keys(screening).forEach(attribute => screeningResult.set(attribute, screening[attribute])) 
      await screeningResult.save()
      return screeningResult.id
    }
    else {
      const screeningResult = new Screening()
      Object.keys(screening).forEach(attribute => screeningResult.set(attribute, screening[attribute])) 
      await screeningResult.save()
      _patient.set('screening', screeningResult)
      _patient.save()
      return screeningResult.id
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const updateMedicalConditions = async (conditions, patientId) => {
  try {
    console.log('hello')
    const MedicalCondition = Parse.Object.extend('MedicalCondition')
    const _patient = await findPatient(patientId)
    const record = _patient.get('conditions')
    if(record){
      const medicalConditions = await new Parse.Query(MedicalCondition).get(record.id)
      Object.keys(conditions).forEach(attribute => medicalConditions.set(attribute, conditions[attribute])) 
      await medicalConditions.save()
      return medicalConditions.id
    }
    else {
      const medicalConditions = new MedicalCondition()
      Object.keys(conditions).forEach(attribute => medicalConditions.set(attribute, conditions[attribute])) 
      await medicalConditions.save()
      _patient.set('conditions', medicalConditions)
      _patient.save()
      return medicalConditions.id
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

// const fetchMedicalRecords = async (patientId) => {
//   try {
//     const _patient = findPatient(patientId)
//     const 
//   } catch (error) {
//     throw error
//   }
// }

const queuePatient = async (tag, patientId, stage) => {
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
    throw error
  }
}

const transferPatient = async (queueId, stage) => {
  try {
    const Queue = Parse.Object.extend('Queue')
    const queuingPatient = await new Parse.Query(Queue).get(queueId)
    queuingPatient.set('stage', stage)
    await queuingPatient.save()
    return queuingPatient.id
  } catch (error) {
    throw error
  }
}

const findProfile = async (id) => {
  try {
    const Profile = Parse.Object.extend('Profile')
    const _profile = (await new Parse.Query(Profile).get(id)).attributes
    return {..._profile, age: new Date().getFullYear() - new Date(_profile.dob).getFullYear()}
  } catch (error) {
    throw error
  }
}

const findPatient = async (patientId) => {
  try {
    const Patient = Parse.Object.extend('Patient')
    const _patient = await new Parse.Query(Patient).get(patientId)
    return _patient
  } catch (error) {
    throw error
  }
}

const findMedicalRecord = async (type, id) => {
  try {
    let record;
    switch(type) {
      case 'vitals': {
        const Vitals = Parse.Object.extend('Vitals')
        record = await new Parse.Query(Vitals).get(id)
        break
      }
      case 'gynaecology': {
        const Gynaecology = Parse.Object.extend('Gynaecology')
        console.log(id)
        record = await new Parse.Query(Gynaecology).get(id)
        break
      }
      case 'cc': {
        const ChiefComplaints = Parse.Object.extend('ChiefComplaints')
        record = await new Parse.Query(ChiefComplaints).get(id)
        break
      }
    }
    return record
  } catch (error) {
    throw error
  }
}

const insertVitalsRecord = async (data) => {
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

const insertGynaecologyRecord = async (data) => {
  try {
    const Gynaecology = Parse.Object.extend('Gynaecology')
    const record = new Gynaecology()
    Object.keys(data).forEach(attribute => record.set(attribute, data[attribute]))
    await record.save()
    console.log(record.id)
    return record.id
  } catch (error) {
    throw error
  }
}

const insertChiefComplaintsRecord = async (data) => {
  try {
    const ChiefComplaints = Parse.Object.extend('ChiefComplaints')
    const record = new ChiefComplaints()
    record.set('description', data)
    await record.save()
    return record.id
  } catch (error) {
    throw error
  }
}

const addMedicalCase = async (records, patientId) => {
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

const attachMetadata = async (recordId, recordType, queueId) => {
  try {
    const Queue = Parse.Object.extend('Queue')
    const queuingPatient = await new Parse.Query(Queue).get(queueId)
    const record = await findMedicalRecord(recordType, recordId)
    queuingPatient.set(recordType, record)
    await queuingPatient.save()
    return queuePatient.id
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  register,
  authenticate,
  deauthenticate,
  insertVitalsRecord,
  attachMetadata,
  insertGynaecologyRecord,
  insertChiefComplaintsRecord,
  updateMedicalHistory,
  updateScreeningResult,
  updateMedicalConditions,
  createPatient,
  queuePatient,
  transferPatient,
  fetchPatients,
  fetchPatientQueue,
  fetchDiagnosis,
  fetchMedicines
}