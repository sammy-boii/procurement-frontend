'use client'

import BackButton from '@/components/btns/BackButton'
import GiantSpinner from '@/components/elements/GiantSpinner'
import RequiredFormTitle from '@/components/elements/RequiredFormTitle'
import { CreateProcurement } from '@/components/forms/ProcurementForm'
import { useGetProfile } from '@/hooks/use-user'

const CreateProcurementPage = () => {
  const { data: profile, isPending } = useGetProfile()

  if (isPending) return <GiantSpinner />

  return (
    <main className='mt-12'>
      <BackButton />
      <RequiredFormTitle title='Requisition Information' />
      <CreateProcurement
        requestorName={profile?.data.name || ''}
        requestor={profile?.data._id || ''}
      />
    </main>
  )
}

export default CreateProcurementPage
