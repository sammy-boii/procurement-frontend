'use client'

import { BookOpen } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

const ViewProcurement = ({ id }: { id: string }) => {
  return (
    <Button asChild variant={'actions'} className='hover:bg-gray-300'>
      <Link href={`/view-procurement/${id}`}>
        <BookOpen size={16} />
      </Link>
    </Button>
  )
}
export default ViewProcurement
