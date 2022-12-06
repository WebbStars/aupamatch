import api from './api'

export interface PostJobPayload {
  escolaridade: string
  experiencia: string
  filhos: string
  descricao: string
  natacao: boolean
  carro: boolean
  habilitacao: boolean
}

interface PostJobResponsePayload {
  response?: { message?: string }
  hasError?: boolean
}

export const postJob = async (
  postJobPayload: PostJobPayload,
  accessToken: string
): Promise<PostJobResponsePayload> => {
  try {
    const response = await api.post('/vaga', postJobPayload, {
      headers: { 'x-access-token': accessToken }
    })

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
