'use client'

import { Children } from 'react'
import { cn } from '@/lib/utils'

export function Row({
  children,
  heading = false,
  divider = false,
  fullWidth = false
}: {
  children: React.ReactNode
  divider?: boolean
  heading?: boolean
  fullWidth?: boolean
}) {
  return heading ? (
    <tr>
      {Children.map(children, (child) => (
        <th
          colSpan={fullWidth ? 5 : 1}
          className='font-medium text-left px-5 py-3 border border-gray-300'
        >
          {child as React.ReactNode}
        </th>
      ))}
    </tr>
  ) : divider ? (
    <tr>
      <td
        colSpan={fullWidth ? 5 : 1}
        className={cn(
          'px-5 py-3 border border-gray-300 border-b-0',
          fullWidth && 'w-full'
        )}
      >
        {children}
      </td>
    </tr>
  ) : (
    <tr>
      {Children.map(children, (child, index) => (
        <td
          colSpan={fullWidth ? 5 : 1}
          className={cn(
            'px-5 max-w-[300px] whitespace-normal break-words py-3 border border-gray-300',
            fullWidth && 'w-full'
          )}
          key={index}
        >
          {child}
        </td>
      ))}
    </tr>
  )
}
