import api from './api'
import { FetchAupairJobState } from './fetch_aupair_jobs'

interface FetchUserResponsePayload {
  response: FetchAupairJobState[]
  hasError?: boolean
}

export const getMyJobs = async (
  accessToken: string
): Promise<FetchUserResponsePayload> => {
  try {
    const response = await api.get('/familia/minhas-vagas', {
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
