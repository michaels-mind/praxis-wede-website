// app/api/admin/opening-hours/route.ts
import { revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('opening_hours')
      .select('*')
      .order('day_of_week', { ascending: true });

    if (error) throw error;
    return Response.json({ success: true, data });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('opening_hours')
      .insert([body]);

    if (error) throw error;

    // 🎯 WICHTIG: Revalidiere die Home-Page!
    revalidatePath('/');

    return Response.json({ success: true, data });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const { data, error } = await supabase
      .from('opening_hours')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;

    // 🎯 Revalidiere nach dem Update
    revalidatePath('/');

    return Response.json({ success: true, data });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const { error } = await supabase
      .from('opening_hours')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // 🎯 Revalidiere nach dem Löschen
    revalidatePath('/');

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
