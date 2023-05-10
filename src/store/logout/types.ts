export const USER_LOGOUT = 'USER_LOGOUT'

export interface FetchLogoutAction {
  type: typeof USER_LOGOUT
  payload: null
}

export type LogoutActionTypes = FetchLogoutAction
