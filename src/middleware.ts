import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  if (!cookies().get('at')?.value)
    return NextResponse.redirect(new URL('/login', req.url))
}

export const config = {
  matcher: ['/my-procurement', '/create-procurement', '/edit-procurement']
}
