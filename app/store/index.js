import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { createEpicMiddleware } from 'redux-observable'
import reducer from '../reducers';
import epics from '../epics'

const epicMiddleware = createEpicMiddleware(epics);

export default function configureStore() {
  const store = createStore(
    reducer,
    applyMiddleware(epicMiddleware)
  );
  return { persistor: persistStore(store), store };
};