import api from './api'

interface FetchUserResponsePayload {
  response?: { message?: string }
  hasError?: boolean
}

export const removeApply = async (
  jobId: string,
  accessToken: string
): Promise<FetchUserResponsePayload> => {
  try {
    const response = await api.delete(`vagas/${jobId}/candidaturas`, {
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
