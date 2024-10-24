'use server'

import { TProcurement } from '@/types/procurement.types'
import { axiosInstance } from '../config'

export const createRequisition = async (data: TProcurement) => {
  const res = await axiosInstance.post('/api/requisitions', data)
  return res.data
}

export const getRequisitions = async () => {
  const res = await axiosInstance.get('/api/requisitions')
  return res.data
}

export const getRequisition = async (id: string) => {
  const res = await axiosInstance.get(`/api/requisitions/${id}`)
  return res.data
}

export const updateRequisition = async (id: string, data: TProcurement) => {
  const res = await axiosInstance.put(`/api/requisitions/${id}`, data)
  return res.data
}

export const deleteRequisition = async (id: string) => {
  const res = await axiosInstance.delete(`/api/requisitions/${id}`)
  return res.data
}
