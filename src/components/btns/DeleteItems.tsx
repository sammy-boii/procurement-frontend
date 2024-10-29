'use client'

import { MessageCircleX } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

const DeleteItems = ({
  index,
  handleRemoveItem,
  className
}: {
  index: number
  className?: string
  handleRemoveItem: (index: number) => void
}) => {
  return (
    <Button
      disabled={index === 0}
      paginated
      type='button'
      onClick={() => {
        handleRemoveItem(index)
      }}
      variant={'destructive'}
      className={cn(
        'w-10 -translate-y-1 h-8',
        index === 0 && 'bg-slate-500',
        className
      )}
    >
      <MessageCircleX />
    </Button>
  )
}
export default DeleteItems
