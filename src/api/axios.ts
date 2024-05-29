import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse } from '@/types/apiTypes'
//import { toast } from 'react-toastify';
import { getItem } from '@/utils/localStorageService'
import { toast } from 'vue3-toastify'

export const Api = axios.create({
  baseURL: 'https://api.realworld.io/api'
  //baseURL: 'https://real-world-server.vercel.app/api/'
})

Api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError<ErrorResponse>) => {
    if (error?.response?.status === 500) {
      toast.error('Something went wrong')
      return Promise.reject([error.message])
    } else {
      return Promise.reject(error?.response?.data)
    }
  }
)

Api.interceptors.request.use((config) => {
  const token = getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
