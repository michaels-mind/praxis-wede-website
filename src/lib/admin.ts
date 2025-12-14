import { supabase } from './db/supabaseClient';

// ============================================================================
// ANNOUNCEMENTS
// ============================================================================

export async function getAnnouncements() {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
  return data;
}

export async function createAnnouncement(announcement: {
  title: string;
  description: string;
  valid_from?: string;
  valid_until?: string;
}) {
  const { data, error } = await supabase
    .from('announcements')
    .insert([announcement])
    .select();

  if (error) throw error;
  return data;
}

export async function updateAnnouncement(
  id: string,
  announcement: Partial<{
    title: string;
    description: string;
    valid_from: string;
    valid_until: string;
  }>
) {
  const { data, error } = await supabase
    .from('announcements')
    .update(announcement)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
}

export async function deleteAnnouncement(id: string) {
  const { error } = await supabase
    .from('announcements')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ============================================================================
// OPENING HOURS - FIXED für openinghours Tabelle
// ============================================================================

export async function getOpeningHours() {
  const { data, error } = await supabase
    .from('openinghours')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching opening hours:', error);
    return [];
  }
  return data;
}

export async function updateOpeningHours(
  id: string,
  hours: {
    open_time?: string;
    close_time?: string;
    is_open?: boolean;
  }
) {
  const { data, error } = await supabase
    .from('openinghours')
    .update(hours)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
}

// ============================================================================
// VACATIONS
// ============================================================================

export async function getVacations() {
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('vacations')
    .select('*')
    .gte('end_date', today)
    .order('start_date', { ascending: true });

  if (error) {
    console.error('Error fetching vacations:', error);
    return [];
  }
  return data;
}

export async function createVacation(vacation: {
  start_date: string;
  end_date: string;
  reason: string;
}) {
  const { data, error } = await supabase
    .from('vacations')
    .insert([vacation])
    .select();

  if (error) throw error;
  return data;
}

export async function deleteVacation(id: string) {
  const { error } = await supabase
    .from('vacations')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ============================================================================
// CONTACT MESSAGES
// ============================================================================

export async function getContactMessages(status?: string) {
  let query = supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching contact messages:', error);
    return [];
  }
  return data;
}

export async function updateContactMessageStatus(
  id: string,
  status: 'new' | 'read' | 'answered' | 'archived'
) {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({ 
      status,
      replied_at: status === 'answered' ? new Date().toISOString() : null 
    })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
}
