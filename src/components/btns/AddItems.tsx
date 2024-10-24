'use client'

import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { newItem } from '@/app/(main)/create-procurement/page'

const AddItems = ({ handleAddItem }: { handleAddItem: any }) => {
  return (
    <Button
      type='button'
      onClick={() => handleAddItem(newItem)}
      className='flex items-center gap-2'
    >
      <Plus size={16} />
      <span>Add More Items</span>
    </Button>
  )
}
export default AddItems
