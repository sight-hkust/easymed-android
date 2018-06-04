import Parse from './parse';

export const register = async (username, password) => {
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

export const authenticate = async (username, password) => {
  try {
    const user = await Parse.User.logIn(username, password)
    return user.authenticated()
  } catch (error) {
    throw error
  }
}

export const deauthenticate = async () => {
  try {
    await Parse.User.logOut()
    return !(Parse.User.current() === null)
  } catch (error) {
    throw error
  }
}

export const createPatient = async (profile) => {
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
    throw error
  }
}

export const fetchMedicines = async () => {
  const Medicine = Parse.Object.extend('Medicine')
  const query = new Parse.Query(Medicine)
  try {
    const result = await query.find()
    return result.map((medicine) => ({...medicine.attributes, id: medicine.id}))
  } catch (error) {
    throw error
  }
}

export const fetchDiagnosises = async (name) => {
  const Diagnosis = Parse.Object.extend('Diagnosis')
  const query = new Parse.Query(Diagnosis)
  try {
    const result = await query.find()
    return result.map((diagnosis) => diagnosis.attributes)
  } catch (error) {
    throw error
  }
}

export const fetchPatients = async () => {
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

export const fetchPatientQueue = async (stage) => {
  const Queue = Parse.Object.extend('Queue')
  const query = new Parse.Query(Queue).equalTo('stage', stage)
  try {
    const result = await query.find()
    const queue = await result.reduce(async (patients, {id, attributes: {patient, tag}}) => {
      patient = await findPatient(patient.id)
      const profile = await findProfile(patient.attributes.profile.id)
      patients[id] = {...profile, tag, id: patient.id}
      return patients
    }, {})
    return queue
  } catch (error) {
    throw error
  }
}

export const updateMedicalHistory = async (history, patientId) => {
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
    throw error
  }
}

export const updateScreeningResult = async (screening, patientId) => {
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
    throw error
  }
}

export const updateMedicalConditions = async (conditions, patientId) => {
  try {
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
    throw error
  }
}

export const fetchMedicalRecords = async (queueId) => {
  try {
    const Queue = Parse.Object.extend('Queue')
    const Vitals = Parse.Object.extend('Vitals')
    const ChiefComplaints = Parse.Object.extend('ChiefComplaints')
    const queuingPatient = await new Parse.Query(Queue).get(queueId)
    const vitals = await new Parse.Query(Vitals).get(queuingPatient.get('vitals').id)
    const cc = await new Parse.Query(ChiefComplaints).get(queuingPatient.get('cc').id)
    const { regular, khmer } = queuingPatient.get('patient').get('profile').get('name')
    return {name: khmer?khmer:regular, vitals: {...vitals.attributes}, cc, pmh: '', screening: '', conditions: '', picture: queuingPatient.get('snapshot').url()}
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const queuePatient = async (tag, picture, patientId, stage) => {
  try {
    const Queue = Parse.Object.extend('Queue')
    const Patient = Parse.Object.extend('Patient')
    const _patient = await new Parse.Query(Patient).get(patientId)
    const enlisting = new Queue()
    console.log(picture)
    const snapshot = await new Parse.File(`${patientId}.JPG`, { base64: picture }).save()
    enlisting.set('stage', stage)
    enlisting.set('patient', _patient)
    enlisting.set('tag', Math.abs(tag))
    enlisting.set('snapshot', snapshot)
    await enlisting.save()
    const profile = await findProfile(_patient.attributes.profile.id)
    return {patient: {...profile, tag, id: patientId}, queueId: enlisting.id}
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const transferPatient = async (queueId, stage) => {
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

export const findProfile = async (id) => {
  try {
    const Profile = Parse.Object.extend('Profile')
    const _profile = (await new Parse.Query(Profile).get(id)).attributes
    return {..._profile, age: new Date().getFullYear() - new Date(_profile.dob).getFullYear()}
  } catch (error) {
    throw error
  }
}

export const findPatient = async (patientId) => {
  try {
    const Patient = Parse.Object.extend('Patient')
    const _patient = await new Parse.Query(Patient).get(patientId)
    return _patient
  } catch (error) {
    throw error
  }
}

export const findMedicalRecord = async (type, id) => {
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

export const insertVitalsRecord = async (data) => {
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

export const insertGynaecologyRecord = async (data) => {
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

export const insertChiefComplaintsRecord = async (data) => {
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

export const addMedicalCase = async (records, patientId) => {
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

export const attachMetadata = async (recordId, recordType, queueId) => {
  try {
    const Queue = Parse.Object.extend('Queue')
    const queuingPatient = await new Parse.Query(Queue).get(queueId)
    const record = await findMedicalRecord(recordType, recordId)
    queuingPatient.set(recordType, record)
    await queuingPatient.save()
    return queuePatient.id
  } catch (error) {
    throw error
  }
}
