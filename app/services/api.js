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

async function createProfile(profile){
  const patient = new Parse.Profile()
  patient.set('name', profile.name)
  try {
    await patient.newProfile()
    return patient.authenticated()
  } catch (error) {
    throw error
  }
}

export { register, createProfile }