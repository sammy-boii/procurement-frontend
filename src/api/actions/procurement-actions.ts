'use server'

import { TProcurement } from '@/types/procurement.types'
import { axiosInstance } from '../config'

export const createProcurement = async (
  data: TProcurement
): Promise<TProcurement[]> => {
  const res = await axiosInstance.post('/procurement', data)
  return res.data
}

export const getProcurements = async () => {
  const res = await axiosInstance.get('/procurement')
  return res.data
}

export const getMyProcurements = async () => {
  const res = await axiosInstance.get('/myprocurement')
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

export const deleteProcurement = async (id: string): Promise<TProcurement> => {
  const res = await axiosInstance.delete(`/procurement/${id}`)
  return res.data
}

export const verifyLevel1 = async (
  id: string,
  data: { signature?: string; remarks?: string }
) => {
  const res = await axiosInstance.post(`/verify/level1/${id}`, data)
  return res.data
}

export const verifyLevel2 = async (
  id: string,
  data: { signature?: string; remarks?: string }
) => {
  const res = await axiosInstance.post(`/verify/level2/${id}`, data)
  return res.data
}

export const rejectLevel1 = async (id: string, data: { remarks?: string }) => {
  const res = await axiosInstance.post(`/reject/level1/${id}`, data)
  return res.data
}

export const rejectLevel2 = async (id: string, data: { remarks?: string }) => {
  const res = await axiosInstance.post(`/reject/level2/${id}`, data)
  return res.data
}
