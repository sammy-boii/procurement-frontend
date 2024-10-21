import MainSidebar from '@/components/MainSidebar'

export default function AppLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex gap-4'>
      <MainSidebar />
      <main className='grow'>{children}</main>
    </div>
  )
}
