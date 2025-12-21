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
  content: string;
  start_date?: string;
  end_date?: string;
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
    content: string;
    start_date: string;
    end_date: string;
  }>,
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
// OPENING HOURS - openinghours Tabelle
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

function normalizeTime(value?: string | null): string | null {
  if (!value) return null;
  if (/^\d{2}:\d{2}:\d{2}$/.test(value)) return value;
  return `${value}:00`;
}

export async function updateOpeningHours(
  id: string,
  hours: {
    open_time?: string;
    close_time?: string;
    is_open?: boolean;
  },
) {
  const payload: {
    morning_start?: string | null;
    morning_end?: string | null;
    is_closed?: boolean;
  } = {};

  if (typeof hours.is_open === 'boolean') {
    // UI: is_open -> DB: is_closed
    payload.is_closed = !hours.is_open;
  }

  if (hours.is_open === false) {
    payload.morning_start = null;
    payload.morning_end = null;
  } else {
    if (typeof hours.open_time !== 'undefined') {
      payload.morning_start = normalizeTime(hours.open_time);
    }
    if (typeof hours.close_time !== 'undefined') {
      payload.morning_end = normalizeTime(hours.close_time);
    }
  }

  const { data, error } = await supabase
    .from('openinghours')
    .update(payload)
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
  description: string;
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
  status: 'new' | 'read' | 'answered' | 'archived',
) {
  const { data, error } = await supabase
    .from('contact_messages')
    .update({
      status,
      replied_at: status === 'answered' ? new Date().toISOString() : null,
    })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
}
