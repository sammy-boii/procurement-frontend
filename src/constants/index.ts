import { ISidebarLinks } from '@/types'
import { LayoutList, Truck } from 'lucide-react'

export const BASE_API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_API_URL
    : process.env.NEXT_PUBLIC_PROD_API_URL

export const ITEM_STATUS = ['PENDING', 'APPROVED', 'REJECTED'] as const

export const sidebarLinks: ISidebarLinks[] = [
  {
    title: 'Procurements',
    url: '/',
    icon: Truck
  },
  {
    title: 'My Requisitions',
    url: '/requisitions',
    icon: LayoutList
  }
] as const
