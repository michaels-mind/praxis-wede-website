import { supabase } from './supabaseClient';

export async function createContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const { data: result, error } = await supabase
    .from('contact_messages')
    .insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        status: 'new',
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) throw error;
  return result;
}
