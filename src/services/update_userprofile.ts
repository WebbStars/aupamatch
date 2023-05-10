import api from './api'

interface FetchUserProfileState {
  email: string
  id: string
  name: string
}

interface FetchUserResponsePayload {
  response?: FetchUserProfileState
  hasError?: boolean
}

type Payload = {
  currentPassword?: string
  password?: string
  nome?: string
}

export const updateUserProfileService = async (
  accessToken: string,
  payload: Payload
): Promise<FetchUserResponsePayload> => {
  try {
    const response = await api.put('/userprofile', payload, {
      headers: {
        'x-access-token': accessToken,
      },
    })

    return {
      response: response.data,
      hasError: false,
    }
  } catch (error) {
    return {
      hasError: true,
    }
  }
}
