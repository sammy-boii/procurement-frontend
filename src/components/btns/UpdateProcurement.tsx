'use client'

import { PencilLine } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

const UpdateProcurement = ({ id }: { id: string }) => {
  return (
    <Button
      asChild
      variant={'actions'}
      className='hover:bg-blue-200 text-secondary'
    >
      <Link href={`/edit-procurement/${id}`}>
        <PencilLine />
      </Link>
    </Button>
  )
}
export default UpdateProcurement
