import api from './api'

export interface FetchUserState {
  roles: string[]
  _id: string
  email: string
  password: string
  name: string
}

interface FetchUserResponsePayload {
  response?: FetchUserState
  hasError?: boolean
}

export const fetchUserService = async (
  id: string,
  accessToken: string
): Promise<FetchUserResponsePayload> => {
  try {
    const response = await api.get(`/userprofile?userID=${id}`, {
      headers: {
        'x-access-token': accessToken
      }
    })

    return {
      response: response.data,
      hasError: false
    }
  } catch (error) {
    return {
      hasError: true
    }
  }
}
