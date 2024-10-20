'use server'

import { TLogin, TSignUp } from '@/types/auth'
import { axiosInstance } from '../config'

export const loginAction = async (data: TLogin) => {
  const res = await axiosInstance.post('/login', data)
  return res.data
}

export const registerAction = async (data: TSignUp) => {
  const res = await axiosInstance.post('/register', data)
  return res.data
}
