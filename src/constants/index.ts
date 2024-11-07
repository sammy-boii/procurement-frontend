import { ISidebarLinks } from '@/types'
import { LayoutList, Truck } from 'lucide-react'

export const BASE_API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_API_URL
    : process.env.NEXT_PUBLIC_PROD_API_URL

export const ITEM_STATUS = {
  PENDING: {
    name: 'PENDING',
    color: 'hsl(39, 100%, 50%)',
    bgColor: 'hsla(39, 100%, 60%, 0.2)'
  },
  REJECTED: {
    name: 'REJECTED',
    color: 'hsl(4, 100%, 60%)',
    bgColor: 'hsla(4, 100%, 60%, 0.2)'
  },
  APPROVED: {
    name: 'APPROVED',
    color: 'hsl(120, 60%, 40%)',
    bgColor: 'hsla(120, 60%, 40%, 0.2)'
  }
} as const

export const DEPARTMENTS = [
  'IT',
  'Finance',
  'HR',
  'Admin',
  'Marketing',
  'Admissions',
  'Research',
  'Student Affairs',
  'Facilities',
  'Library',
  'Procurement',
  'Others'
] as const

export type TDepartment = (typeof DEPARTMENTS)[number] | 'ALL'
export const sidebarLinks: ISidebarLinks[] = [
  {
    title: 'Procurements',
    url: '/',
    icon: Truck
  },
  {
    title: 'My Procurements',
    url: '/my-procurement',
    icon: LayoutList
  }
] as const
