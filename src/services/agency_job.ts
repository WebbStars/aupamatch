import api from './api'

interface FetchAgencyJobResponsePayload {
  response?: { approvalUrl: string }
  hasError?: boolean
}

export const agencyJob = async (
  accessToken: string,
  jobId: string
): Promise<FetchAgencyJobResponsePayload> => {
  try {
    const response = await api.post(
      `/agenciar-vaga/${jobId}`,
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
      hasError: true,
    }
  }
}
