import { revalidatePath } from 'next/cache';
import { createServiceClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = createServiceClient();
    // Greift jetzt korrekt auf die Tabelle 'vacations' zu
    const { data, error } = await supabase
      .from('vacations')
      .select('*')
      .order('start_date', { ascending: true });

    if (error) throw error;
    return Response.json({ success: true, data: data || [] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServiceClient();
    const body = await request.json();

    // Wir speichern direkt in 'vacations'
    const vacationPayload = {
      start_date: body.start_date,
      end_date: body.end_date,
      description: body.reason || 'Geschlossen', // Mapping für die DB
      is_active: true
    };

    const { data, error } = await supabase
      .from('vacations')
      .insert([vacationPayload])
      .select();

    if (error) throw error;
    revalidatePath('/');
    return Response.json({ success: true, data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createServiceClient();
    const { id } = await request.json();
    // Löschen aus 'vacations', nicht 'announcements'
    const { error } = await supabase.from('vacations').delete().eq('id', id);

    if (error) throw error;
    revalidatePath('/');
    return Response.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
