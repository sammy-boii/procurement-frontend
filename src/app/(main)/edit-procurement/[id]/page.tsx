import { getProcurement } from '@/api/actions/procurement-actions'
import { getUserById } from '@/api/actions/user-actions'
import { CreateProcurement } from '@/components/forms/ProcurementForm'
import { TProcurement } from '@/types/procurement.types'
import { TUser } from '@/types/user.types'
import React from 'react'

const EditProcurementPage = async ({
  params: { id }
}: {
  params: { id: string }
}) => {
  const procurementRes = await getProcurement(id)
  const procurement: TProcurement = procurementRes.data

  const requestorRes = await getUserById(procurement.requestor)
  const requestor: TUser = requestorRes.data

  return (
    <CreateProcurement
      edit
      id={id}
      data={procurement}
      requestorName={requestor.name}
    />
  )
}

export default EditProcurementPage
