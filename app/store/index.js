import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import reducer from '../reducers';

export default function configureStore() {
  const store = createStore(reducer);
  return { persistor: persistStore(store), store };
};