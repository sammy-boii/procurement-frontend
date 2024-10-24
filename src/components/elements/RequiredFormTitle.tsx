import React from 'react'

const RequiredFormTitle = ({ title }: { title: string }) => {
  return (
    <h2 className='my-12 space-x-1'>
      <span className='text-xl font-semibold'>{title}</span>
      <span className='text-[#ED353A] text-xl'>*</span>
    </h2>
  )
}

export default RequiredFormTitle
