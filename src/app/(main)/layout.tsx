import MainSidebar from '@/components/MainSidebar'

export default function AppLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex'>
      <MainSidebar />
      <div>Hello</div>
      <main>hekki</main>
    </div>
  )
}
