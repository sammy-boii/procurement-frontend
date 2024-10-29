'use server'

import { TProcurement } from '@/types/procurement.types'
import { axiosInstance } from '../config'

export const createProcurement = async (data: TProcurement) => {
  const res = await axiosInstance.post('/procurement', data)
  return res.data
}

export const getProcurements = async () => {
  const res = await axiosInstance.get('/procurement')
  return res.data
}

export const getProcurement = async (id: string) => {
  const res = await axiosInstance.get(`/procurement/${id}`)
  return res.data
}

export const updateProcurement = async (
  id: string,
  data: Partial<TProcurement>
) => {
  const res = await axiosInstance.put(`/procurement/${id}`, data)
  return res.data
}

export const deleteProcurement = async (id: string) => {
  const res = await axiosInstance.delete(`/procurement/${id}`)
  return res.data
}
