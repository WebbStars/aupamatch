import api from './api'
import { PostJobPayload } from './post_job'

interface FetchUserResponsePayload {
  response?: PostJobPayload
  hasError?: boolean
}

export const editJob = async (
  job: any,
  accessToken: string
): Promise<FetchUserResponsePayload> => {
  try {
    const response = await api.put(`/vaga/${job._id}`, job, {
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
