import MainSidebar from '@/components/MainSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { poppins } from '@/lib/fonts'
import { Command } from 'lucide-react'

export default function AppLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`flex bg-[#FCFDFC] gap-2 ${poppins.variable}`}>
      <TooltipProvider>
        <SidebarProvider>
          <MainSidebar />
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger className='self-center' />
            </TooltipTrigger>
            <TooltipContent className='flex text-sm font-bold gap-1 items-center'>
              <Command size={16} />
              <p className=''>+ B</p>
            </TooltipContent>
          </Tooltip>
        </SidebarProvider>
      </TooltipProvider>

      <main className='grow mt-12 font-poppins'>{children}</main>
    </div>
  )
}
