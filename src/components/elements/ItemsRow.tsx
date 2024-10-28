import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import DeleteItems from '../btns/DeleteItems'
import { useEffect } from 'react'

const ItemsRow = ({
  form,
  index,
  handleRemoveItem
}: {
  handleRemoveItem: (index: number) => void
  index: number
  form: UseFormReturn<any, any, undefined>
}) => {
  const quantity = form.watch(`items.${index}.quantity`)
  const unitPrice = form.watch(`items.${index}.unitPrice`)

  useEffect(() => {
    const totalPrice = quantity * unitPrice
    form.setValue(`items[${index}].totalPrice`, totalPrice || 0)
    console.log('AA')
  }, [quantity, unitPrice, form, index])

  return (
    <div className='flex items-baseline gap-3'>
      <div className='flex relative gap-x-16'>
        <FormField
          control={form.control}
          name={`items.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item</FormLabel>
              <FormControl>
                <Input required placeholder='Enter item name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`items.${index}.quantity`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  required
                  min={0}
                  placeholder='Enter quantity'
                  {...field}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    field.onChange(value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`items.${index}.unitPrice`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Price</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min={0}
                  step='any'
                  required
                  placeholder='Enter unit price'
                  {...field}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    field.onChange(value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`items.${index}.totalPrice`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Price</FormLabel>
              <FormControl>
                <Input {...field} value={quantity * unitPrice} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <DeleteItems
        className='self-end justify-self-center'
        handleRemoveItem={handleRemoveItem}
        index={index}
      />
    </div>
  )
}

export default ItemsRow
