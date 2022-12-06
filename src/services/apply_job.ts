import api from './api'

interface ApplyJobPayload {
  jobId: string
  aupairId: string
  accessToken: string
}

interface FetchUserResponsePayload {
  response?: { message?: string }
  hasError?: boolean
}

export const applyJob = async (
  applyJobPayload: ApplyJobPayload
): Promise<FetchUserResponsePayload> => {
  const { jobId, aupairId, accessToken } = applyJobPayload

  try {
    const response = await api.get(
      `/candidatar?vagaID=${jobId}&aupairID=${aupairId}`,
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
