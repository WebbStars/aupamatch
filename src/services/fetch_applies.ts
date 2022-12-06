import api from './api'

export interface FetchAppliesJobState {
  vaga: string[]
  aupair: string[]
  user: string[]
  _id: string
  escolha: boolean
  __v: number
}

interface FetchAppliesResponsePayload {
  response?: FetchAppliesJobState[]
  hasError?: boolean
}

export const fetchAppliesService = async (
  id: string,
  accessToken: string
): Promise<FetchAppliesResponsePayload> => {
  try {
    const response = await api.get<FetchAppliesJobState[]>(
      `/getcandidaturas?id=${id}`,
      {
        headers: {
          'x-access-token': accessToken
        }
      }
    )

    return {
      response: response.data,
      hasError: false
    }
  } catch (error) {
    return {
      hasError: true
    }
  }
}
