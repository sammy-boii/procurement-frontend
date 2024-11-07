'use client'

import {
  createProcurement,
  deleteProcurement,
  getMyProcurements,
  getProcurement,
  getProcurements,
  rejectLevel1,
  rejectLevel2,
  updateProcurement,
  verifyLevel1,
  verifyLevel2
} from '@/api/actions/procurement-actions'
import { TProcurement } from '@/types/procurement.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

interface IRes<T> {
  message: string
  data: T
}

export interface IPaginatedProcurement {
  procurements: TProcurement[]
  limit: number
  currentPage: number
  totalPages: number
  totalProcurements: number
}

export const useGetProcurements = () => {
  return useQuery<IRes<IPaginatedProcurement>>({
    queryKey: ['procurement'],
    queryFn: () => getProcurements()
  })
}

export const useGetProcurementById = (id: string) => {
  return useQuery<IRes<TProcurement>>({
    queryKey: ['procurement', id],
    queryFn: () => getProcurement(id)
  })
}

export const useGetMyProcurements = () => {
  return useQuery<IRes<IPaginatedProcurement>>({
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
      queryClient.invalidateQueries({ queryKey: ['procurement'] })
      toast.success('Successfully created procurement')
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
      queryClient.invalidateQueries({ queryKey: ['procurement'] })
      toast.success('Procurement updated sucessfully')
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
      queryClient.invalidateQueries({ queryKey: ['procurement'] })
      toast.success('Procurement deleted successfully')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}
export const useVerifyLevel1 = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data
    }: {
      id: string
      data: { signature?: string; remarks?: string }
    }) => verifyLevel1(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['procurement'] })
      toast.success('Successfully verified level 1')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}

export const useVerifyLevel2 = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data
    }: {
      id: string
      data: { signature?: string; remarks?: string }
    }) => verifyLevel2(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['procurement'] })
      toast.success('Successfully verified level 2')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}

export const useRejectLevel1 = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { remarks?: string } }) =>
      rejectLevel1(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['procurement'] })
      toast.success('Successfully rejected level 1')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}

export const useRejectLevel2 = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { remarks?: string } }) =>
      rejectLevel2(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['procurement'] })
      toast.success('Successfully rejected level 2')
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })
}
