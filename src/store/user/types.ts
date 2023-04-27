import { FetchUserProfileState, FetchUserState } from '../../services'

export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE'

export interface FetchUserAction {
  type: typeof FETCH_USER
  payload: FetchUserState | null
  error?: boolean
}

export interface FetchUserProfileAction {
  type: typeof FETCH_USER_PROFILE
  payload: FetchUserProfileState | null
  error?: boolean
}

export type UserActionTypes = FetchUserAction | FetchUserProfileAction
