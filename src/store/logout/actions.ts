import { USER_LOGOUT, FetchLogoutAction } from './types'

const userLogout = (): FetchLogoutAction => {
  return {
    type: USER_LOGOUT,
    payload: null,
  }
}

export { userLogout }
