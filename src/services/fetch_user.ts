import api from './api'

export interface FetchUserState {
  carro_exclusivo: boolean
  cep: string
  cidade: string
  complemento: string
  data_de_nascimento: string
  data_disponibilidade: string
  escolaridade: string
  estado: string
  experiencia_trabalho: string
  firstLogin: boolean
  genero: string
  habilitacao: boolean
  habilitacao_pid: string
  idiomas: string[]
  logradouro: string
  nacionalidade: string
  natacao: boolean
  numero: string
  numero_identificacao_nacional: string
  passaporte: string
  quantidade_criancas: string
  receber_newsletter: boolean
  religiao: string
  resumo: string
  telefone: string
  user: string[]
  __v: 0
  _id: '640cd41745a33b0035a7ec0a'
}

interface FetchUserResponsePayload {
  response?: FetchUserState
  hasError?: boolean
}

export const fetchUserService = async (
  id: string,
  accessToken: string
): Promise<FetchUserResponsePayload> => {
  try {
    const response = await api.get(`/perfil?userID=${id}`, {
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
