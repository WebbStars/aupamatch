import { AxiosError } from 'axios'
import { api } from '../../../../services'

interface LoginResponse {
  response?: Record<string, never>
  hasError?: boolean
  error?: string
  statusCode?: number
}

export const verifyEmail = async (email: string): Promise<LoginResponse> => {
  try {
    const response = await api.post(`auths/forgot_password?email=${email}`)

    return {
      response: response.data,
    }
  } catch (error) {
    const err = error as AxiosError

    return {
      hasError: true,
      statusCode: err.response?.status,
      // error: err.response.data.error,
    }
  }
}
