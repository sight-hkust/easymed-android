import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { registerEpic } from '../epics/auth';
import reducer from '../reducers';

export default function configureStore() {
  const rootEpic = combineEpics(
    registerEpic
  )
  const epicMiddleware = createEpicMiddleware(rootEpic)
  const store = createStore(
    reducer,
    applyMiddleware(epicMiddleware)
  );
  return { persistor: persistStore(store), store };
};