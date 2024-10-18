import type { Metadata } from 'next'
import './globals.css'

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
        <main className='max-w-screen-xl mx-auto'>{children}</main>
      </body>
    </html>
  )
}
