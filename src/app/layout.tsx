import type { Metadata } from 'next'
import './globals.css'
import GlobalContextProvider from '@/contexts/GlobalContextProvider'
import { poppins } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'Procreate App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <GlobalContextProvider>
          <main>{children}</main>
        </GlobalContextProvider>
      </body>
    </html>
  )
}
