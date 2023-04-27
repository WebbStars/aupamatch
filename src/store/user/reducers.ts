import { UserActionTypes, FETCH_USER, FETCH_USER_PROFILE } from './types'
import { FetchUserProfileState, FetchUserState } from '../../services'

const initialState = null

const userReducer = (
  state: FetchUserState | null = initialState,
  action: UserActionTypes
): FetchUserState | null => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload

    default:
      return state
  }
}

const userProfileReducer = (
  state: FetchUserProfileState | null = initialState,
  action: UserActionTypes
): FetchUserProfileState | null => {
  switch (action.type) {
    case FETCH_USER_PROFILE:
      return action.payload
    default:
      return state
  }
}

export { userReducer, userProfileReducer }
