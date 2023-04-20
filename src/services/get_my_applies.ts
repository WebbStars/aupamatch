import api from './api'

export interface FetchApplies {
  candidatura: {
    aupairId: string
    data_candidatura: string
    status: string
    _id: string
  }
  carro_exclusivo: boolean
  data_disponibilidade: string
  data_finalizacao_vaga: string
  descricao: string
  escolaridade: string
  estado_provincia: string
  experiencia_trabalho: string
  faixa_etaria: string[]
  genero: string
  habilitacao: boolean
  idiomas: string[]
  nacionalidade: string
  natacao: boolean
  pais: string
  passaporte: string
  quantidade_criancas: string
  receber_newsletter: boolean
  religiao: string
  resumo: string
  titulo_vaga: string
  user: string[]
  vaga_patrocinada: boolean
  views: number
  _id: string
}

interface FetchAppliesResponsePayload {
  response: FetchApplies[]
  hasError?: boolean
}

export const getMyApplies = async (
  accessToken: string
): Promise<FetchAppliesResponsePayload> => {
  try {
    const response = await api.get('/minhas-candidaturas', {
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
