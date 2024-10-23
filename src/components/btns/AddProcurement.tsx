'use client'

import { Plus } from 'lucide-react'
import { Button } from '../ui/button'

const AddProcurement = () => {
  return (
    <Button className='flex items-center gap-2'>
      <Plus size={16} />
      <span>Make Procurement Request</span>
    </Button>
  )
}
export default AddProcurement
