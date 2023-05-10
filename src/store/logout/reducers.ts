import { LogoutActionTypes, USER_LOGOUT } from './types'

const logoutReducer = (state: null = null, action: LogoutActionTypes): null => {
  switch (action.type) {
    case USER_LOGOUT:
      return action.payload
    default:
      return state
  }
}

export default logoutReducer
