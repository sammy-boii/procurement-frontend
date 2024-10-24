import { cn } from '@/lib/utils'
import React from 'react'

const OptionalFormTitle = ({
  title,
  className
}: {
  title: string
  className?: string
}) => {
  return (
    <h2 className={cn('my-12 space-x-1', className)}>
      <span className='text-xl font-semibold'>{title}</span>
      <span className='opacity-80 text-[10px]'>(opitonal)</span>
    </h2>
  )
}

export default OptionalFormTitle
