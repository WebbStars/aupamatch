import { UserActionTypes, FETCH_USER } from './types'
import { FetchUserState } from '../../services'

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

export default userReducer
