import { persistReducer } from 'redux-persist';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import authReducer from './auth';
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

const config = {
  key: 'root',
  storage,
  blacklist: ['auth']
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer)
});

export default persistReducer(config, rootReducer);