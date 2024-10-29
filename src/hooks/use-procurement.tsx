'use client'

import {
  createProcurement,
  deleteProcurement,
  updateProcurement
} from '@/api/actions/procurement-actions'
import { TProcurement } from '@/types/procurement.types'
import { useMutation } from '@tanstack/react-query'
import { revalidateTag } from 'next/cache'

export const useCreateProcurement = () => {
  return useMutation({
    mutationFn: (newProcurement: TProcurement) =>
      createProcurement(newProcurement),
    onSuccess: () => {
      revalidateTag('procurement')
    }
  })
}

export const useUpdateProcurement = () => {
  return useMutation({
    mutationFn: ({
      id,
      newProcurement
    }: {
      id: string
      newProcurement: Partial<TProcurement>
    }) => updateProcurement(id, newProcurement),
    onSuccess: () => {
      revalidateTag('procurement')
    }
  })
}

export const useDeleteProcurement = () => {
  return useMutation({
    mutationFn: (id: string) => deleteProcurement(id),
    onSuccess: () => {
      revalidateTag('procurement')
    }
  })
}
