import { configureStore } from '@reduxjs/toolkit';
// import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

export default function configureAppStore(preloadedState) {
    // const middlewares = [thunkMiddleware];
    // const middlewareEnhancer = applyMiddleware(...middlewares);

    // const enhancers = [middlewareEnhancer];
  const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     immutableCheck: false,
    //     serializableCheck: false,
    // }),
    preloadedState,
    // enhancers,
  })

  return store
}