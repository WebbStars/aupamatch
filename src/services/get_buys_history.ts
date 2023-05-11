import api from './api'

export interface FetchBuysHistoryState {
  _id: string
  date: string
  product: string
  value: 25
}

interface FetchBuysHistoryResponse {
  response?: FetchBuysHistoryState[]
  hasError?: boolean
}

export const getBuysHistory = async (
  accessToken: string
): Promise<FetchBuysHistoryResponse> => {
  try {
    const response = await api.get('/compra-history', {
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
