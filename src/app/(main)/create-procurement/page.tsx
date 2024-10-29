import { getProfile } from '@/api/actions/user-actions'
import BackButton from '@/components/btns/BackButton'
import RequiredFormTitle from '@/components/elements/RequiredFormTitle'
import { CreateProcurement } from '@/components/forms/ProcurementForm'

const CreateProcurementPage = async () => {
  const userRes = await getProfile()

  return (
    <main className='mt-12'>
      <BackButton />
      <RequiredFormTitle title='Requisition Information' />
      <CreateProcurement
        requestorName={userRes.data.name}
        requestor={userRes.data._id}
      />
    </main>
  )
}

export default CreateProcurementPage
