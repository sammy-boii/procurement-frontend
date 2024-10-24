'use client'

import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const BackButton = () => {
  return (
    <Link className='flex text-xl text-primary items-center gap-1' href='/'>
      <ChevronLeft size={20} /> <span>Back</span>
    </Link>
  )
}

export default BackButton
