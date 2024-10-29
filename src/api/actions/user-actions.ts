'use server'

import { axiosInstance } from '../config'

export const getProfile = async () => {
  const res = await axiosInstance.get(`/user`)
  return res.data
}

export const getUserById = async (id: string) => {
  const res = await axiosInstance.get(`/user/${id}`)
  return res.data
}
