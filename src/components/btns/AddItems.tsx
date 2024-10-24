'use client'

import { Plus } from 'lucide-react'
import { Button } from '../ui/button'

const AddItems = ({ setItems }: { setItems: () => void }) => {
  return (
    <Button
      type='button'
      onClick={setItems}
      className='flex items-center gap-2'
    >
      <Plus size={16} />
      <span>Add More Items</span>
    </Button>
  )
}
export default AddItems
