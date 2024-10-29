'use server'

import axios from 'axios'
import { BASE_API_URL } from '../constants'
import { cookies } from 'next/headers'
import chalk from 'chalk'

export const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10 * 1000
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookies().get('at')?.value || ''
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log(chalk.bgRed(`[ERROR] ${error.response.data.error}`))
    return Promise.reject(new Error(error.response.data?.error))
  }
)
