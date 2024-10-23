import AddProcurement from '@/components/btns/AddProcurement'
import DeleteProcurement from '@/components/btns/DeleteProcurement'
import UpdateProcurement from '@/components/btns/UpdateProcurement'
import PageHeading from '@/components/PageHeading'
import { Truck } from 'lucide-react'

export default function HomePage() {
  return (
    <main>
      <PageHeading
        title='Procurement'
        description='Request for, and view all procurements'
        logo={Truck}
      />
      <AddProcurement />
      <DeleteProcurement id={''} />
      <UpdateProcurement />
    </main>
  )
}
