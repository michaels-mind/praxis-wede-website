import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'GreenHealth2025';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // /admin schützen, aber /admin/login zulassen
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const authToken = request.cookies.get('admin_auth')?.value;

    if (!authToken || authToken !== ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
};
