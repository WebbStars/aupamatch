import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose
} from 'redux'
import logger from 'redux-logger'
import { rootReducer } from '../store'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middlewares = []

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

export default store
