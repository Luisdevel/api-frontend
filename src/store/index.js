import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import persistedReducers from './modules/reduxPersist';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducers(rootReducer),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
export const persistor = persistStore(store);
