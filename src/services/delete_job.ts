import api from './api'

export const deleteJob = async (accessToken: string, jobId: string) => {
  try {
    const response = await api.delete(`/vaga/${jobId}`, {
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
