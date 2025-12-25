// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'GreenHealth2025';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Alle /admin-Routen schützen
  if (pathname.startsWith('/admin')) {
    const authToken = request.cookies.get('admin_auth')?.value;

    // Kein Token oder falsches Token → Redirect zu /admin/login
    if (!authToken || authToken !== ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
};
