import { AxiosError } from 'axios'
import api from './api'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  email: string
  id: string
  name: string
  firstLogin: boolean
  roles: string[]
  message?: string
}

interface LoginResponsePayload {
  response?: LoginResponse
  hasError?: boolean
  error?: string
}

export const internalLogin = async (
  payload: LoginPayload
): Promise<LoginResponsePayload> => {
  try {
    const response = await api.post('/auth/signin', payload)

    return {
      response: response.data,
      hasError: false,
    }
  } catch (err) {
    const error = err as AxiosError
    const statusCode = error.response?.status

    if (statusCode === 401 || statusCode == 404) {
      return {
        hasError: true,
        error: 'invalid_credentials',
      }
    }
    return {
      hasError: true,
    }
  }
}
