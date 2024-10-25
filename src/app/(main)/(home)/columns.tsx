'use client'

import { ColumnDef } from '@tanstack/react-table'
import { TProcurement } from '@/types/procurement.types'

import { ITEM_STATUS } from '@/constants'
import UpdateProcurement from '@/components/btns/UpdateProcurement'
import DeleteProcurement from '@/components/btns/DeleteProcurement'
import ViewProcurement from '@/components/btns/ViewProcurement'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<TProcurement>[] = [
  {
    accessorKey: 'requisitionNo',
    header: 'Requisition Number'
  },
  {
    accessorKey: 'requisitionDate',
    header: ({ column }) => {
      return (
        <Button
          className='p-0 m-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Requested Date
          <ArrowUpDown className='h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue('requisitionDate') as Date
      const formattedDate = date.toLocaleDateString()
      return <div className='w-fit text-center'>{formattedDate}</div>
    }
  },
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ row }) => <div>{row.original.department}</div>
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
    header: () => <div className='text-center'>Actions</div>,
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className='flex items-center justify-center gap-1'>
          <UpdateProcurement id={''} />
          <DeleteProcurement id={''} />
          <ViewProcurement id={''} />
        </div>
      )
    }
  }
]
