/* eslint-disable @typescript-eslint/ban-types */
import { createStore, applyMiddleware, compose, Middleware } from 'redux';
// import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
// import RootSagas from './rootSaga';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import appReducers from './rootReducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export default () => {
  const middleware: Middleware[] = [];
  const enhancers = [];

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['loginReducer'],
  };

  const __DEV__ = process.env.NODE_ENV !== 'production';

  /* ------------- Saga Middleware ------------- */
  // const sagaMiddleware: SagaMiddleware<{}> = createSagaMiddleware();
  // middleware.push(sagaMiddleware);

  /* ------------- Logger Middleware ------------- */
  const loggerMiddleware = (createLogger as any)();
  if (__DEV__) {
    // create the logger
    const logger = createLogger() as never;
    middleware.push(logger);
  }

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware) as never);

  /** ------------ Redux devtool --------------------- */

  const composeEnhancers =
    __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const persistedReducer = persistReducer(persistConfig, appReducers);
  const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(loggerMiddleware)));
  const persistor = persistStore(store);

  // kick off root saga
  // sagaMiddleware.run(RootSagas);
  return { store, persistor };
};
