'use client'

import { ColumnDef } from '@tanstack/react-table'
import { TProcurement } from '@/types/procurement.types'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ITEM_STATUS } from '@/constants'

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

      return <div>{statusInfo.name}</div>
    }
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
