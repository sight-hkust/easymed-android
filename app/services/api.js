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
  const Patient = Parse.Object.extend("Patient");
  const Profile = Parse.Object.extend("Profile");
  const patient = new Patient()
  const profile = new Profile()
  Object.keys(profile).forEach(attribute => profile.set(attribute, profile[attribute]))
  patient.set('profile', profile)
  try {
    await Promise.all([profile.save(), patient.save()])
    return patient.authenticated()
  } catch (error) {
    throw error
  }
}

export { register, authenticate }