import api from './api'

export interface FetchAupairJobState {
  ativo: boolean
  carro_exclusivo: boolean
  candidaturas: {
    aupairId: string
    data_candidatura: string
    status: string
    _id: string
  }[]
  data_criacao_vaga: string
  data_disponibilidade: string
  data_finalizacao_vaga: string
  descricao: string
  escolaridade: string
  estado_provincia: string
  genero: string
  habilitacao: boolean
  habilitacao_pid: string
  idioma: string
  nacionalidade: string
  natacao: boolean
  numero_identificacao_nacional: string
  pais: string
  passaporte: string
  quantidade_criancas: string
  receber_newsletter: boolean
  religiao: string
  resumo: string
  score: string
  titulo_vaga: string
  user: string[]
  vaga_patrocinada: boolean
  isSaved: boolean
  views?: number
  _id: string
  __v: number
}

export interface Job {
  job?: FetchAupairJobState
  uuid: string
  title: string
  description: string
  tags: string[]
}

interface FetchAupairJobResponsePayload {
  response?: FetchAupairJobState[]
  hasError?: boolean
}

export const fetchAupairJobsService = async (
  accessToken: string
): Promise<FetchAupairJobResponsePayload> => {
  try {
    const response = await api.get<FetchAupairJobState[]>(`/vagas`, {
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
