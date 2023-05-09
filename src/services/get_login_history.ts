import api from './api'

export interface FetchLoginHistoryState {
  _id: string
  date: string
  ipAddress: string
  location: string
}

interface FetchUserResponsePayload {
  response?: FetchLoginHistoryState[]
  hasError?: boolean
}

export const getLoginHistory = async (
  accessToken: string
): Promise<FetchUserResponsePayload> => {
  try {
    const response = await api.get('/login-history', {
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
