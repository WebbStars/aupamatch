import { combineReducers, CombinedState } from 'redux'
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux'
import exampleReducer from './logout/reducers'
import { userReducer, userProfileReducer } from './user/reducers'
import globalNotificationReducer from './notifications/reducers'
import jobsReducer from './jobs/reducers'
import logoutReducer from './logout/reducers'

const appReducer = combineReducers({
  example: exampleReducer,
  user: userReducer,
  userProfile: userProfileReducer,
  notification: globalNotificationReducer,
  jobs: jobsReducer,
  logout: logoutReducer,
})

export const rootReducer: typeof appReducer = (state, action) => {
  const newState = {
    ...state,
  } as CombinedState<RootState> | undefined

  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action)
  }

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
