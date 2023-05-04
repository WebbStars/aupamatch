import api from './api'

interface FetchUserResponsePayload {
  response: any
  hasError?: boolean
}

export const disableJob = async (
  accessToken: string,
  jobId: string
): Promise<FetchUserResponsePayload> => {
  try {
    const response = await api.put(
      `/vaga/${jobId}/toggle`,
      {},
      {
        headers: {
          'x-access-token': accessToken,
        },
      }
    )

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
