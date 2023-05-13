import { AxiosError } from 'axios'
import { api } from '../../../../services'

interface LoginResponse {
  response?: Record<string, never>
  hasError?: boolean
  error?: {
    title: string
    detail: string
  }
  statusCode?: number
}

interface ChangePasswordPayload {
  token: string
  password: string
  confirmation: string
  authenticator_id: string
}

export const changePassword = async (
  payload: ChangePasswordPayload
): Promise<LoginResponse> => {
  try {
    const response = await api.post('auths/reset_password', payload)

    return {
      response: response.data,
    }
  } catch (error) {
    const err = error as AxiosError

    return {
      hasError: true,
      statusCode: err.response?.status,
      // error: err.response?.data.error,
    }
  }
}
