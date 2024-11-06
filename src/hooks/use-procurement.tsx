'use client'

import {
  createProcurement,
  deleteProcurement,
  getMyProcurements,
  getProcurement,
  getProcurements,
  updateProcurement
} from '@/api/actions/procurement-actions'
import { TProcurement } from '@/types/procurement.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useGetProcurements = () => {
  useQuery<TProcurement[]>({
    queryKey: ['procurement'],
    queryFn: () => getProcurements()
  })
}

export const useGetProcurementById = (id: string) => {
  useQuery<TProcurement>({
    queryKey: ['procurement', id],
    queryFn: () => getProcurement(id)
  })
}

export const useGetMyProcurements = () => {
  useQuery<TProcurement[]>({
    queryKey: ['procurement'],
    queryFn: () => getMyProcurements()
  })
}

export const useCreateProcurement = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newProcurement: TProcurement) =>
      createProcurement(newProcurement),
    onSuccess: () => {
      toast.success('Successfully created procurement')
      queryClient.invalidateQueries({ queryKey: ['procurement'] })
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}

export const useUpdateProcurement = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      newProcurement
    }: {
      id: string
      newProcurement: Partial<TProcurement>
    }) => updateProcurement(id, newProcurement),
    onSuccess: () => {
      toast.success('Procurement updated sucessfully')
      queryClient.invalidateQueries({ queryKey: ['procurement'] })
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}

export const useDeleteProcurement = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteProcurement(id),
    onSuccess: () => {
      toast.success('Procurement deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['procurement'] })
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}
