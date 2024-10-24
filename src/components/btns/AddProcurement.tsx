'use client'

import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

const AddProcurement = () => {
  return (
    <Button className='flex items-center gap-2' asChild>
      <Link href='/create-procurement'>
        <Plus size={16} />
        <span>Make Procurement Request</span>
      </Link>
    </Button>
  )
}
export default AddProcurement
