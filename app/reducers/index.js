import { persistCombineReducers } from 'redux-persist';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import authReducer from './auth';

const storage = createSensitiveStorage({
  keychainService: 'guardedVault',
  sharedPreferencesName: "guardedVault"
});

const config = {
  key: "root",
  storage,
};

const reducers = {
  auth: authReducer
};

const reducer = persistCombineReducers(config, reducers);

export default reducer;