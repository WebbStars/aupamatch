import { FetchUserState } from '../../services'

export const FETCH_USER = 'FETCH_USER'

export interface FetchUserAction {
  type: typeof FETCH_USER
  payload: FetchUserState | null
  error?: boolean
}

export type UserActionTypes = FetchUserAction
