import { AxiosError } from 'axios'
import { api } from '../../../../services'

export type System = {
  id: string
  name: string
  sid: string
  type: string
}

interface SuccessResponse {
  available: boolean
  systems: System[]
  token: string
}

interface LoginResponse {
  response?: SuccessResponse
  hasError?: boolean
  error?: string
  statusCode?: number
}

export const validateToken = async (token: string): Promise<LoginResponse> => {
  try {
    const response = await api.get(
      `auths/token_verification?token=${token}&include=authenticators`
    )

    return {
      response: response.data,
    }
  } catch (error) {
    const err = error as AxiosError

    return {
      hasError: true,
      statusCode: err.response?.status,
      // error: err.response?.data?.error,
    }
  }
}
