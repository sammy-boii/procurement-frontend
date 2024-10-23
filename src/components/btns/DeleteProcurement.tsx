'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { deleteRequisition } from '@/api/actions/requisitions-actions'

const DeleteProcurement = ({ id }: { id: string }) => {
  return (
    <Button
      onClick={() => deleteRequisition(id)}
      variant={'destructive'}
      className='w-10 h-8'
    >
      <Trash2 />
    </Button>
  )
}
export default DeleteProcurement
