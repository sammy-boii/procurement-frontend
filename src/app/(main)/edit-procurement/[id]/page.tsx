'use client'

import GiantSpinner from '@/components/elements/GiantSpinner'
import { CreateProcurement } from '@/components/forms/ProcurementForm'
import { useGetProcurementById } from '@/hooks/use-procurement'
import { useGetUserById } from '@/hooks/use-user'
import React from 'react'

const EditProcurementPage = ({
  params: { id }
}: {
  params: { id: string }
}) => {
  const { data: procurement, isPending: isProcurementPending } =
    useGetProcurementById(id)

  const { data: requestor, isPending: isRequestorPending } = useGetUserById(
    procurement?.data._id || ''
  )

  if (isProcurementPending || isRequestorPending) return <GiantSpinner />

  return (
    <CreateProcurement
      edit
      id={id}
      data={procurement!.data}
      requestorName={requestor?.data.name || ''}
    />
  )
}

export default EditProcurementPage
