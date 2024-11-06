import { LoaderCircle } from 'lucide-react'
import React from 'react'

const GiantSpinner = () => {
  return (
    <div className='grid min-h-screen place-items-center'>
      <LoaderCircle className='animate-spin' size={55} />
    </div>
  )
}

export default GiantSpinner
