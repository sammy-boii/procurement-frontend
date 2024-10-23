'use client'

import { PencilLine } from 'lucide-react'
import { Button } from '../ui/button'

const UpdateProcurement = () => {
  return (
    <Button variant={'secondary'} className='w-10 h-8'>
      <PencilLine size={16} />
    </Button>
  )
}
export default UpdateProcurement
