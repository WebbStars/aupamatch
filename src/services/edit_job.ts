import api from './api'

interface FetchUserResponsePayload {
  response: any
  hasError?: boolean
}

export const editJob = async (
  job: any,
  accessToken: string
): Promise<FetchUserResponsePayload> => {
  try {
    const response = await api.put(`/vagas/${job._id}`, job, {
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
