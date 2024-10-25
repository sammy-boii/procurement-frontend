'use client'

import { BookOpen } from 'lucide-react'
import { Button } from '../ui/button'

const ViewProcurement = ({ id }: { id: string }) => {
  return (
    <Button variant={'actions'} className='hover:bg-gray-300'>
      <BookOpen size={16} />
    </Button>
  )
}
export default ViewProcurement
