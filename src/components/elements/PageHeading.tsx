import { LucideIcon } from 'lucide-react'
import Image from 'next/image'

const PageHeading = ({
  logo: Logo,
  title,
  description
}: {
  logo: LucideIcon
  title: string
  description: string
}) => {
  return (
    <div className='space-y-1'>
      <div className='flex items-center gap-3'>
        <Logo size={19} />
        <h1 className='font-semibold tracking-tight text-3xl'>{title}</h1>
      </div>
      <div className='text-primary text-[12px] font-medium'>{description}</div>
    </div>
  )
}
export default PageHeading
