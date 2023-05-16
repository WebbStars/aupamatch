import api from './api'

interface Response {
  response?: { approvalUrl: string }
  hasError?: boolean
}

export const sponsorJob = async (
  jobId: string,
  accessToken: string
): Promise<Response> => {
  try {
    const response = await api.post(
      `/pagamento/vaga-patrocinada/${jobId}`,
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
