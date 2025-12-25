// src/app/api/admin/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'GreenHealth2025';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true }, { status: 200 });

      // Cookie exakt auf ADMIN_PASSWORD setzen, nur für /admin
      response.cookies.set('admin_auth', ADMIN_PASSWORD, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/admin',
        // kein maxAge -> Session-Cookie
      });

      return response;
    } else {
      return NextResponse.json({ error: 'Falsches Passwort' }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 });
  }
}
