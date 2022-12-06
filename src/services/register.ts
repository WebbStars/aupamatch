import { AxiosError } from 'axios'
import api from './api'

export interface CreateUserPayload {
  email: string
  name: string
  password: string
  roles: string
}

export interface CreateResponse {
  message: string
}

interface CreateUserResponsePayload {
  response?: CreateResponse
  hasError?: boolean
  statusCode?: string | number
}

export const createUser = async (
  payload: CreateUserPayload
): Promise<CreateUserResponsePayload> => {
  try {
    const response = await api.post('/auth/signup', payload)

    return {
      response: response.data,
      hasError: false
    }
  } catch (err) {
    const error = err as AxiosError

    return {
      hasError: true,
      statusCode: error.response?.status
    }
  }
}
