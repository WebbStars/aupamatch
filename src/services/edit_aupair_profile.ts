import api from './api'

export interface EditAupairPayload {}

interface EditAupairResponsePayload {
  response?: { message?: string }
  hasError?: boolean
}

export const editAupairProfile = async (
  editAupairPayload: EditAupairPayload,
  accessToken: string
): Promise<EditAupairResponsePayload> => {
  try {
    const response = await api.put('/perfil', editAupairPayload, {
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
