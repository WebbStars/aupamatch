import api from './api'

export interface FetchLoginHistoryState {
  _id: string
  date: string
  ipAddress: string
  location: string
}

interface FetchLoginHistoryResponse {
  response?: FetchLoginHistoryState[]
  hasError?: boolean
}

export const getLoginHistory = async (
  accessToken: string
): Promise<FetchLoginHistoryResponse> => {
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
