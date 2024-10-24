'use client'

import { PencilLine } from 'lucide-react'
import { Button } from '../ui/button'

const UpdateProcurement = ({ id }: { id: string }) => {
  return (
    <Button variant={'actions'} className='hover:bg-[#e0f0fa] text-secondary'>
      <PencilLine />
    </Button>
  )
}
export default UpdateProcurement
