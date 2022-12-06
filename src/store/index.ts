import { combineReducers, CombinedState } from 'redux'
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook
} from 'react-redux'
import exampleReducer from './example/reducers'
import userReducer from './user/reducers'
import globalNotificationReducer from './notifications/reducers'
import jobsReducer from './jobs/reducers'

const appReducer = combineReducers({
  example: exampleReducer,
  user: userReducer,
  notification: globalNotificationReducer,
  jobs: jobsReducer
})

export const rootReducer: typeof appReducer = (state, action) => {
  const newState = {
    ...state
  } as CombinedState<RootState> | undefined

  return appReducer(newState, action)
}

type RootState = ReturnType<typeof appReducer>

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

type ExtractedActions = typeof appReducer extends (
  state: CombinedState<RootState>,
  action: infer T
) => RootState
  ? T
  : never

type ActionTypes = ExtractedActions

type RootDispatch = <T extends ActionTypes>(action: T) => T

export const useDispatch = (): RootDispatch => useReduxDispatch()
