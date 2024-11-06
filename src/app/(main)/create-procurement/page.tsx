'use client'

import BackButton from '@/components/btns/BackButton'
import RequiredFormTitle from '@/components/elements/RequiredFormTitle'
import { CreateProcurement } from '@/components/forms/ProcurementForm'
import { useGetProfile } from '@/hooks/use-user'

const CreateProcurementPage = () => {
  const { data: profile } = useGetProfile()

  return (
    <main className='mt-12'>
      <BackButton />
      <RequiredFormTitle title='Requisition Information' />
      <CreateProcurement
        requestorName={userRes.data}
        requestor={userRes.data._id}
      />
    </main>
  )
}

export default CreateProcurementPage
