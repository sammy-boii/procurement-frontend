import MainSidebar from '@/components/MainSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { poppins } from '@/lib/fonts'

export default function AppLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`flex max-w-screen-xl gap-10 ${poppins.variable}`}>
      <SidebarProvider>
        <MainSidebar />
      </SidebarProvider>
      <main className='w-full mt-12 font-poppins'>{children}</main>
    </div>
  )
}
