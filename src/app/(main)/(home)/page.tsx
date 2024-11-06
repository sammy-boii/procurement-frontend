'use client'

import AddProcurement from '@/components/btns/AddProcurement'
import PageHeading from '@/components/elements/PageHeading'
import { Truck } from 'lucide-react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { useGetProcurements } from '@/hooks/use-procurement'
import GiantSpinner from '@/components/elements/GiantSpinner'
import { TProcurement } from '@/types/procurement.types'

export default function HomePage() {
  const { data, isPending } = useGetProcurements()

  if (isPending) return <GiantSpinner />

  console.log(data)

  return (
    <main>
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
        <DataTable
          columns={columns}
          res={data!.data}
          data={data!.data.procurements}
        />
      </div>
    </main>
  )
}
