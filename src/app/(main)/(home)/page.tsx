import AddProcurement from '@/components/btns/AddProcurement'
import PageHeading from '@/components/elements/PageHeading'
import { Truck } from 'lucide-react'
import { DataTable } from './data-table'
import { dummyData } from '@/lib/dummyData'
import { columns } from './columns'
import { useEffect, useRef } from 'react'

export default function HomePage() {
  return (
    <main className=''>
      <header>
        <PageHeading
          title='Procurement'
          description='Request for, and view all procurements'
          logo={Truck}
        />
        <div className='flex mt-20 justify-between'>
          <h2 className='text-xl font-semibold'>Procurement Requests</h2>
          <AddProcurement />
        </div>
      </header>

      <div className='container mx-auto py-10'>
        <DataTable columns={columns} data={dummyData} />
      </div>
    </main>
  )
}