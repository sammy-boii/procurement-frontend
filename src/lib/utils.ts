import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (str: number) => {
  return str.toLocaleString('gb-ne').replace(/,/g, ', ')
}
