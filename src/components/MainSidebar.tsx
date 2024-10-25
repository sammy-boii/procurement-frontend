'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import heraldLogo from '../../public/assets/herald-logo.png'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Command } from 'lucide-react'

export default function MainSidebar() {
  const pathName = usePathname()
  return (
    <Sidebar>
      <SidebarContent className='overflow-visible relative'>
        <SidebarGroup>
          <SidebarHeader>
            <Image src={heraldLogo} alt='logo' />
          </SidebarHeader>
          <SidebarGroupContent className='mt-12'>
            <SidebarMenu>
              {sidebarLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className='h-10'
                    isActive={pathName === item.url}
                    asChild
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger className='absolute -right-9 top-1' />
          </TooltipTrigger>
          <TooltipContent className='flex text-sm font-bold gap-1 items-center'>
            <Command size={16} />
            <p className=''>+ B</p>
          </TooltipContent>
        </Tooltip>
      </SidebarContent>
    </Sidebar>
  )
}
