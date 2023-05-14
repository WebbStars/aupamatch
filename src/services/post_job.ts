import api from './api'

export interface PostJobPayload {
  titulo_vaga: string
  data_disponibilidade: string
  vaga_patrocinada: boolean
  pais: string
  estado_provincia: string
  nacionalidade: string
  quantidade_criancas: number
  numero_identificacao_nacional: number
  religiao: string
  carro_exclusivo: boolean
  idioms: string[]
  faixa_etaria: string
  experiencia_trabalho: string
  habilitacao: boolean
  escolaridade: string
  natacao: boolean
  resumo: string
  descricao: string
  genero: string
  habilitacao_pid: string
  passaporte: boolean
  receber_newsletter: boolean
  _id: string
}

interface PostJobResponsePayload {
  response?: PostJobPayload
  hasError?: boolean
}

export const postJob = async (
  postJobPayload: Omit<PostJobPayload, '_id'>,
  accessToken: string
): Promise<PostJobResponsePayload> => {
  try {
    const response = await api.post('/vaga', postJobPayload, {
      headers: { 'x-access-token': accessToken },
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
