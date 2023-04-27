import {
  FetchUserAction,
  FETCH_USER,
  FETCH_USER_PROFILE,
  FetchUserProfileAction,
} from './types'
import { fetchUserProfileService, fetchUserService } from '../../services'

const fetchUser = async (
  id: string,
  accessToken: string
): Promise<FetchUserAction> => {
  const { response } = await fetchUserService(id, accessToken)

  if (response) {
    return {
      type: FETCH_USER,
      payload: response,
    }
  } else {
    return {
      type: FETCH_USER,
      payload: null,
      error: true,
    }
  }
}

const fetchUserProfile = async (
  accessToken: string
): Promise<FetchUserProfileAction> => {
  const { response } = await fetchUserProfileService(accessToken)

  if (response) {
    return {
      type: FETCH_USER_PROFILE,
      payload: response,
    }
  } else {
    return {
      type: FETCH_USER_PROFILE,
      payload: null,
      error: true,
    }
  }
}

export { fetchUser, fetchUserProfile }
