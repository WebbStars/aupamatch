import { FetchUserAction, FETCH_USER } from './types'
import { fetchUserService } from '../../services'

const fetchUser = async (
  id: string,
  accessToken: string
): Promise<FetchUserAction> => {
  const { response } = await fetchUserService(id, accessToken)

  if (response) {
    return {
      type: FETCH_USER,
      payload: response
    }
  } else {
    return {
      type: FETCH_USER,
      payload: null,
      error: true
    }
  }
}

export { fetchUser }
