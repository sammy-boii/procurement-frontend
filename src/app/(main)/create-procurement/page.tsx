'use client'

import BackButton from '@/components/btns/BackButton'
import RequiredFormTitle from '@/components/elements/RequiredFormTitle'
import { Form, FormField } from '@/components/ui/form'
import { TProcurement } from '@/types/procurement.types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
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
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { format } from 'date-fns'
import OptionalFormTitle from '@/components/elements/OptionalFormTitle'
import { Textarea } from '@/components/ui/textarea'
import { procurementSchema } from '@/schemas/procurement.schema'
import AddItems from '@/components/btns/AddItems'
import { TPurchaseOrderItem } from '@/types/purchaseOrder.types'
import ItemsRow from '@/components/elements/ItemsRow'

export const newItem: TPurchaseOrderItem = {
  name: '',
  quantity: 0,
  totalPrice: 0,
  unitPrice: 0
}

const CreateProcurement = () => {
  const form = useForm<TProcurement>({
    resolver: zodResolver(procurementSchema),
    defaultValues: {
      requestor: 'Sam',
      items: [newItem]
    }
  })

  const {
    fields: itemsFields,
    append: appendItem,
    remove: removeItem
  } = useFieldArray({
    control: form.control,
    name: 'items'
  })

  function onSubmit(data: TProcurement) {
    console.log(data, 'data')
  }

  return (
    <main className='mt-12'>
      <BackButton />

      <RequiredFormTitle title='Requisition Information' />

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
                    <Input required placeholder='XXXXXXXXXXXXXXX' {...field} />
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'MM/dd/yyyy')
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
                        selected={field.value}
                        onSelect={(date) => {
                          if (date && date >= new Date()) {
                            field.onChange(date)
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
            <FormField
              control={form.control}
              name='requestor'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requested By</FormLabel>
                  <FormControl>
                    <Input disabled required {...field} />
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
                    <Input
                      required
                      placeholder='Enter the department'
                      {...field}
                    />
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
                      placeholder='XXXXXXXXXXXXXXX'
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
                      className='resize-none'
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
            {itemsFields.map((_, index) => (
              <ItemsRow
                form={form}
                index={index}
                handleRemoveItem={removeItem}
                key={index}
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
                          className={cn(
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'MM/dd/yyyy')
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
                        selected={field.value}
                        onSelect={(date) => {
                          if (date && date >= new Date()) {
                            field.onChange(date)
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
    </main>
  )
}

export default CreateProcurement
