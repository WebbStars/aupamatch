import api from './api'

interface FetchUserResponsePayload {
  response?: { message?: string }
  hasError?: boolean
}

export const favoriteJob = async (
  jobId: string,
  accessToken: string
): Promise<FetchUserResponsePayload> => {
  try {
    const response = await api.post(
      `/favoritar/${jobId}`,
      {},
      {
        headers: {
          'x-access-token': accessToken,
        },
      }
    )

    console.log(response)

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
