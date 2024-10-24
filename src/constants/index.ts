import { ISidebarLinks } from '@/types'
import { LayoutList, Truck } from 'lucide-react'

export const BASE_API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_API_URL
    : process.env.NEXT_PUBLIC_PROD_API_URL

export const ITEM_STATUS = {
  PENDING: {
    name: 'PENDING',
    color: 'hsl(39, 100%, 60%)', // HSL for a vibrant orange
    bgColor: 'hsla(39, 100%, 60%, 0.2)' // 20% opacity
  },
  REJECTED: {
    name: 'REJECTED',
    color: 'hsl(4, 100%, 60%)', // HSL for a vibrant red
    bgColor: 'hsla(4, 100%, 60%, 0.2)' // 20% opacity
  },
  APPROVED: {
    name: 'APPROVED',
    color: 'hsl(120, 60%, 40%)', // HSL for a rich green
    bgColor: 'hsla(120, 60%, 40%, 0.2)' // 20% opacity
  }
} as const

export const sidebarLinks: ISidebarLinks[] = [
  {
    title: 'Procurements',
    url: '/',
    icon: Truck
  },
  {
    title: 'My Procurements',
    url: '/my-procurements',
    icon: LayoutList
  }
] as const
