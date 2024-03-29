import api from './api'

export interface FetchUserProfileState {
  email: string
  id: string
  name: string
  roles: string
  pagamentoPublicador?: boolean
  pagamentoMaisCandidaturas?: boolean
}

interface FetchUserResponsePayload {
  response?: FetchUserProfileState
  hasError?: boolean
}

export const fetchUserProfileService = async (
  accessToken: string
): Promise<FetchUserResponsePayload> => {
  try {
    const response = await api.get(`/userprofile`, {
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
