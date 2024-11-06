'use client'

import {
  ColumnDef,
  getPaginationRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
  getSortedRowModel
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import * as React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useEffect, useRef, useState } from 'react'
import { TProcurement } from '@/types/procurement.types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight, Command } from 'lucide-react'
import { DEPARTMENTS, ITEM_STATUS, TDepartment } from '@/constants'

type TStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL'

interface DataTableProps<TData, TValue> {
  res: {
    procurements: TProcurement[]
    currentPage: 1
    totalPages: 1
    totalProcurements: 1
    limit: 10
  }
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

interface IFilterableField {
  value: keyof TProcurement
  name: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  res
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [filterValue, setFilterValue] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const [filterField, setFilterField] =
    useState<keyof TProcurement>('requisitionNo')

  const filterableFields: IFilterableField[] = [
    { value: 'requisitionNo', name: 'Requisition No' }
  ]

  const handleFilterFieldChange = (val: string) => {
    if (filterField) {
      table.getColumn(filterField)?.setFilterValue('')
    }
    setFilterField(val as keyof TProcurement)
    setFilterValue('')
  }

  const handleDepartmentChange = (department: TDepartment) => {
    table
      .getColumn('department')
      ?.setFilterValue(department === 'ALL' ? '' : department)
  }

  const handleStatusChange = (status: TStatus) => {
    table
      .getColumn('verificationStatus')
      ?.setFilterValue(status === 'ALL' ? '' : status)
  }

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const table = useReactTable({
    data,

    columns,
    // manualPagination: true,
    getPaginationRowModel: getPaginationRowModel(),
    rowCount: res.totalProcurements,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,

    state: {
      sorting,
      columnFilters,
      pagination
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel()
  })

  console.log(res.totalProcurements)

  return (
    <div>
      <div className='flex items-center justify-between py-4 mb-2'>
        <div className='flex items-center gap-4'>
          <div className='relative text-sm'>
            <div className='absolute bg-slate-200 p-1 rounded-sm right-[6px] top-[6px] font-semibold opacity-70 flex gap-1 items-center'>
              <Command size={14} />
              <span>K</span>
            </div>
            <Input
              ref={inputRef}
              placeholder={`Search by ${filterField}`}
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value)
                table.getColumn(filterField)?.setFilterValue(e.target.value)
              }}
              className='h-10 max-w-sm'
            />
          </div>

          <Select onValueChange={handleFilterFieldChange}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Search Filters' />
            </SelectTrigger>
            <SelectContent>
              {filterableFields.map((field) => (
                <SelectItem key={field.value} value={field.value}>
                  {field.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='flex items-center gap-3'>
          <Select
            onValueChange={(val) => handleDepartmentChange(val as TDepartment)}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Department' />
            </SelectTrigger>
            <SelectContent className='h-[250px]'>
              <SelectItem className='bg-gray-100 text-gray-800' value='ALL'>
                All
              </SelectItem>

              {Object.values(DEPARTMENTS).map((department) => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(val) => handleStatusChange(val as TStatus)}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className='bg-gray-100 text-gray-800' value='ALL'>
                All
              </SelectItem>

              {Object.values(ITEM_STATUS).map((status) => (
                <SelectItem
                  key={status.name}
                  value={status.name}
                  style={{
                    color: status.color
                  }}
                >
                  {status.name.charAt(0) +
                    status.name.slice(1).toLocaleLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-center space-x-2 py-4'>
        <Button
          variant='outline'
          paginated
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
          <span>Previous</span>
        </Button>
        <Button
          variant='outline'
          paginated
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span>Next</span>
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
