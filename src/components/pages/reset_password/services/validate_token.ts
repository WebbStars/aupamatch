import { AxiosError } from 'axios'
import { api } from '../../../../services'

interface SuccessResponse {
  available: boolean
  code: string
}

interface LoginResponse {
  response?: SuccessResponse
  hasError?: boolean
  error?: string
  statusCode?: number
}

export const validateToken = async (
  email: string,
  code: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post('validate-token', { email, code })

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
