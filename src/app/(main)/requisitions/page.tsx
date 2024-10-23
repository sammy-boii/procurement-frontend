import PageHeading from '@/components/PageHeading'
import { LayoutList } from 'lucide-react'

export default function RequisitionsPage() {
  return (
    <main>
      <PageHeading
        title='Requisitions'
        description='Request for, and view all your requisitions'
        logo={LayoutList}
      />
    </main>
  )
}
