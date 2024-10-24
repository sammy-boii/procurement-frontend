'use client'

import { ColumnDef } from '@tanstack/react-table'
import { TProcurement } from '@/types/procurement.types'

import { ITEM_STATUS } from '@/constants'
import UpdateProcurement from '@/components/btns/UpdateProcurement'
import DeleteProcurement from '@/components/btns/DeleteProcurement'
import ViewProcurement from '@/components/btns/ViewProcurement'

export const columns: ColumnDef<TProcurement>[] = [
  {
    accessorKey: 'requisitionNo',
    header: 'Requisition Number'
  },
  {
    accessorKey: 'requisitionDate',
    header: 'Date Requested',
    cell: ({ row }) => {
      const date = row.getValue('requisitionDate') as Date
      const formattedDate = date.toISOString().split('T')[0]
      console.log(formattedDate)
      return <div className=''>{formattedDate}</div>
    }
  },
  {
    accessorKey: 'verificationStatus.finalStatus',
    header: 'Final Status',
    cell: ({ row }) => {
      const statusKey =
        row.original.verificationStatus?.finalStatus || 'PENDING'
      const statusInfo = ITEM_STATUS[statusKey]

      return (
        <div
          style={{
            backgroundColor: statusInfo.bgColor,
            color: statusInfo.color,
            width: 'fit-content',
            fontSize: '12px',
            fontWeight: '500',
            borderRadius: '4px'
          }}
          className='px-2 rounded-xl py-1'
        >
          {statusInfo.name}
        </div>
      )
    }
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      return (
        <>
          <UpdateProcurement id={''} />
          <DeleteProcurement id={''} />
          <ViewProcurement id={''} />
        </>
      )
    }
  }
]
