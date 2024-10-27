import { Poppins } from 'next/font/google'

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '300', '200', '100', '500', '600', '700'],
  variable: '--font-poppins'
})
