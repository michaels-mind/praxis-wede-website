import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// 1. Harter Reset: Keine Imports aus anderen Dateien.
// Wir definieren den Client direkt hier, um JEDEN Import-Fehler auszuschließen.
const setupSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ FATAL: Credentials fehlen in .env.local');
    throw new Error('Server-Konfiguration fehlt (Credentials).');
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false, // Wichtig für Serverless
      autoRefreshToken: false,
    },
  });
};

export async function GET() {
  console.log('🔄 GET /api/admin/opening-hours gestartet...');
  try {
    const supabase = setupSupabase();
    
    const { data, error } = await supabase
      .from('opening_hours')
      .select('*')
      .order('day_of_week', { ascending: true });


    if (error) {
      console.error('❌ Supabase DB Error:', error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    console.log(`✅ GET erfolgreich: ${data?.length} Einträge geladen.`);
    return NextResponse.json({ success: true, data: data || [] });

  } catch (err: any) {
    console.error('❌ CRASH in GET Route:', err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  console.log('🔄 PUT /api/admin/opening-hours gestartet...');
  try {
    const supabase = setupSupabase();
    const body = await request.json();
    
    console.log('📦 Empfangene Daten:', body);

    const { id, ...updates } = body;

    // Helper: Leere Strings ("") zu null machen, sonst knallt Postgres bei TIME-Feldern
    const cleanTime = (t: any) => (t === '' || t === undefined ? null : t);

    const cleanData = {
      ...updates,
      morning_start: cleanTime(updates.morning_start),
      morning_end: cleanTime(updates.morning_end),
      afternoon_start: cleanTime(updates.afternoon_start),
      afternoon_end: cleanTime(updates.afternoon_end),
    };

    console.log('🧹 Bereinigte Daten für DB:', cleanData);

    const { data, error } = await supabase
      .from('opening_hours')
      .update(cleanData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('❌ Supabase UPDATE Error:', error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    console.log('✅ Update erfolgreich.');
    return NextResponse.json({ success: true, data });

  } catch (err: any) {
    console.error('❌ CRASH in PUT Route:', err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
