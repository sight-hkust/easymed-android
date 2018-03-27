import { persistReducer } from 'redux-persist';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import authReducer from './auth';
import profileReducer from './profile'
import vitalsReducer from './vitals'
import patientsReducer from './patients'
import { combineReducers } from 'redux';

const storage = createSensitiveStorage({
  keychainService: 'guardedVault',
  sharedPreferencesName: "guardedVault"
});

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['loading']
}

const profilePersisConfig = {
  key: 'profile',
  storage,
  blacklist: ['patientId', 'loading']
}

const patientsPersistConfig = {
  key: 'patients',
  storage,
  blacklist: ['patients', 'loading']
}

const config = {
  key: 'root',
  storage,
  blacklist: ['auth', 'profile']
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  profile: persistReducer(profilePersisConfig, profileReducer),
  patients: persistReducer(patientsPersistConfig, patientsReducer),
  vitalsReducer
});

export default persistReducer(config, rootReducer);