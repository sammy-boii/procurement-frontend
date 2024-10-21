import { Calendar, Home, Inbox, LayoutList, User } from 'lucide-react'

export const BASE_API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_API_URL
    : process.env.NEXT_PUBLIC_PROD_API_URL

export const sidebarLinks = [
  {
    title: 'Home',
    url: '/',
    icon: Home
  },
  {
    title: 'Inbox',
    url: '/inbox',
    icon: Inbox
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar
  },
  {
    title: 'Requisitions',
    url: '/requisitions',
    icon: LayoutList
  },

  {
    title: 'Profile',
    url: '/profile',
    icon: User
  }
]
