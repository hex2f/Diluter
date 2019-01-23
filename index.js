import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import GenerateReducer from './GenerateReducer'
import Connector from './Connector'

export default (defaultState) => {
  const mappedReducers = {}
  Object.keys(defaultState).forEach(key => {
    mappedReducers[key] = GenerateReducer(key, defaultState[key], {})
  })

  let reducers = combineReducers(mappedReducers)
  let store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  )
  return store
}

export { Connector, GenerateReducer }
