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
import { Command } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

interface IFilterableField {
  value: keyof TProcurement
  name: string
}

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

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
    useState<keyof TProcurement>('department')

  const filterableFields: IFilterableField[] = [
    { value: 'department', name: 'Department' },
    { value: 'requisitionNo', name: 'Requisition No' }
  ]
  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel()
  })

  return (
    <div>
      <div className='flex justify-between py-4 mb-2'>
        <div className='relative text-sm'>
          <div className='absolute bg-slate-200 p-1 rounded-sm right-[6px] top-[6px] font-semibold opacity-70 flex gap-1 items-center'>
            <Command size={14} />
            <span>K</span>
          </div>
          <Input
            ref={inputRef}
            placeholder={`Search by ${filterField}`}
            value={
              (table.getColumn(filterField)?.getFilterValue() as string) ?? ''
            }
            onChange={(e) =>
              table.getColumn(filterField)?.setFilterValue(e.target.value)
            }
            className='h-10 max-w-sm'
          />
        </div>

        <Select
          onValueChange={(val) => setFilterField(val as keyof TProcurement)}
        >
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
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          paginated
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          paginated
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
