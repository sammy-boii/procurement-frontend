'use client'

import RequiredFormTitle from '@/components/elements/RequiredFormTitle'
import { Form, FormField } from '@/components/ui/form'
import { TProcurement, TPurchaseOrderItem } from '@/types/procurement.types'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CalendarIcon, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import OptionalFormTitle from '@/components/elements/OptionalFormTitle'
import { Textarea } from '@/components/ui/textarea'
import { procurementSchema } from '@/schemas/procurement.schema'
import AddItems from '@/components/btns/AddItems'
import ItemsRow from '@/components/elements/ItemsRow'
import {
  createProcurement,
  updateProcurement
} from '@/api/actions/procurement-actions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { DEPARTMENTS } from '@/constants'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export const newItem: TPurchaseOrderItem = {
  name: '',
  quantity: 0,
  totalPrice: 0,
  unitPrice: 0
}

interface IEditProps {
  edit: true
  id: string
  data: TProcurement
  requestorName: string
}
interface ICreateProps {
  edit?: false
  requestor: string
  requestorName: string
}

export const CreateProcurement = (props: IEditProps | ICreateProps) => {
  const defaultData = props.edit
    ? props.data
    : {
        requestor: props.requestor,
        requisitionDate: new Date().toISOString(),
        totalNetPrice: 0,
        items: [newItem]
      }

  const router = useRouter()

  const form = useForm<TProcurement>({
    resolver: zodResolver(procurementSchema),
    defaultValues: defaultData
  })

  const {
    fields: itemsFields,
    append: appendItem,
    remove: removeItem
  } = useFieldArray({
    control: form.control,
    name: 'items'
  })

  async function onSubmit(data: TProcurement) {
    const totalNetPrice = data.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    )

    const finalData = { ...data, totalNetPrice }

    try {
      if (props.edit) {
        await updateProcurement(props.id, finalData)
        toast.success('Procurement updated successfully')
        router.replace('/')
      } else {
        await createProcurement(finalData)
        toast.success('Procurement created successfully')
        router.replace('/')
      }
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className='grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-10 w-[80%]'>
          <FormField
            control={form.control}
            name='requisitionNo'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requisition Number</FormLabel>
                <FormControl>
                  <Input disabled placeholder='XXXXXXXXXXXXXXX' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='requisitionDate'
            render={({ field }) => (
              <FormItem className='flex gap-y-[9px] flex-col'>
                <FormLabel>Requisition Date</FormLabel>

                <FormControl>
                  <div className='bg-[#F2F2F5] hover:cursor-not-allowed text-gray-500 text-sm flex gap-2 py-2 px-4 rounded'>
                    {new Date().toLocaleDateString()}
                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='requestor'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requested By</FormLabel>
                <FormControl>
                  <div className='bg-[#F2F2F5] hover:cursor-not-allowed text-gray-500 text-sm flex gap-2 py-2 px-4 rounded'>
                    {props.requestorName || 'N/A'}
                    <User className='ml-auto h-4 w-4 opacity-50' />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='department'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={props.edit ? props.data.department : ''}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select Department' />
                    </SelectTrigger>
                    <SelectContent className='h-[250px]'>
                      {DEPARTMENTS.map((department) => (
                        <SelectItem key={department} value={department}>
                          {department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <RequiredFormTitle title='Expenses Information' />
        <section className='grid grid-cols-1 gap-y-7 gap-x-10 w-full'>
          <FormField
            control={form.control}
            name='expenseType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expense Type</FormLabel>
                <FormControl>
                  <Input
                    className='w-[38%]'
                    required
                    placeholder='Enter expense type'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='purpose'
            render={({ field }) => (
              <FormItem className='flex gap-y-[9px] flex-col'>
                <FormLabel>Reason for purchase</FormLabel>

                <FormControl>
                  <Textarea
                    rows={7}
                    placeholder='Write a message...'
                    className='resize-none max-w-[80%] md:max-w-full'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <RequiredFormTitle title='Procurement Request' />
        <section className='w-full space-y-10'>
          {itemsFields.map((field, index) => (
            <ItemsRow
              key={field.id}
              form={form}
              index={index}
              handleRemoveItem={removeItem}
            />
          ))}
          <AddItems handleAddItem={appendItem} />
        </section>
        <OptionalFormTitle title='Vendor Information' />
        <section className='grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-10 w-[80%]'>
          <FormField
            control={form.control}
            name='supplierVendorInformation.name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='supplierVendorInformation.address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder='Enter address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='supplierVendorInformation.phoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input placeholder='Enter phone number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='supplierVendorInformation.expectedDate'
            render={({ field }) => (
              <FormItem className='flex gap-y-[9px] flex-col'>
                <FormLabel>Expected Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(!field.value && 'text-muted-foreground')}
                      >
                        {field.value ? (
                          new Date(field.value).toLocaleDateString()
                        ) : (
                          <span>mm/dd/yyyy</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={new Date(field.value || '')}
                      onSelect={(date) => {
                        if (date && date >= new Date()) {
                          field.onChange(date.toISOString())
                        }
                      }}
                      disabled={(date) =>
                        date < new Date('1900-01-01') || date < new Date()
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <Button
          className='w-fit my-12'
          disabled={form.formState.isSubmitting}
          type='submit'
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
