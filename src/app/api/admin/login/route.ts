// src/app/api/admin/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'GreenHealth2025';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true }, { status: 200 });
      
      // ✅ Setzt ein Session-Cookie (wird bei Browser-Schluss gelöscht)
      response.cookies.set('admin_auth', password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        // KEIN maxAge oder expires
      });
      
      return response;
    } else {
      return NextResponse.json({ error: 'Falsches Passwort' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 });
  }
}
