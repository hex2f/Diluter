import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import GenerateReducer from './GenerateReducer'
import Connector from './Connector'

export default (defaultState, hook, customMiddlewares) => {
  const mappedReducers = {}
  Object.keys(defaultState).forEach(key => {
    mappedReducers[key] = GenerateReducer(key, defaultState[key], hook)
  })

  let reducers = combineReducers(mappedReducers)
  let middlewares = [thunk, ...customMiddlewares]
  let store = createStore(reducers, compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : a => a
  ))
  return store
}

export { Connector, GenerateReducer }
