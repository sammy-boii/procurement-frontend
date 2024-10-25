'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { deleteRequisition } from '@/api/actions/procurement-actions'

const DeleteProcurement = ({ id }: { id: string }) => {
  return (
    <Button
      onClick={() => deleteRequisition(id)}
      variant={'actions'}
      className='text-destructive hover:bg-red-200'
    >
      <Trash2 />
    </Button>
  )
}
export default DeleteProcurement
