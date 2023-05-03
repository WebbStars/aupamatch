import api from './api'

interface FetchUserResponsePayload {
  response: any
  hasError?: boolean
}

export const getJob = async (
  accessToken: string,
  jobId: string
): Promise<FetchUserResponsePayload> => {
  try {
    const response = await api.get(`/vagas/${jobId}`, {
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
      response: [],
      hasError: true,
    }
  }
}
