import axios, { AxiosResponse, AxiosError } from 'axios'

const axiosConfig = {
  baseURL: process.env.API_ADDRESS
}

const api = axios.create(axiosConfig)

const errorHandler = (error: AxiosError) => {
  return Promise.reject({ ...error })
}

const successHandler = (response: AxiosResponse) => response

api.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
)

export default api
