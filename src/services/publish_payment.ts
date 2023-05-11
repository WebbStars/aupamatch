import { AxiosError } from 'axios'
import api from './api'

interface EditAupairResponsePayload {
  response?: { approvalUrl: string }
  hasError?: boolean
  statusCode?: number
}

export const publishPayment = async (
  accessToken: string
): Promise<EditAupairResponsePayload> => {
  try {
    const response = await api.post(
      '/pagamento/publicador',
      {},
      {
        headers: { 'x-access-token': accessToken },
      }
    )

    return {
      response: response.data,
      hasError: false,
    }
  } catch (error) {
    const err = error as AxiosError
    return {
      hasError: true,
      statusCode: err.response?.status,
    }
  }
}
