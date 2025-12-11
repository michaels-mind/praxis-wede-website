import { createClient } from './supabaseClient';

// ============================================================================
// ANNOUNCEMENTS
// ============================================================================

export async function getAnnouncements() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function createAnnouncement(announcement: {
  title: string;
  content: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('announcements')
    .insert([announcement])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateAnnouncement(id: string, updates: Partial<{
  title: string;
  content: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('announcements')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteAnnouncement(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('announcements')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// ============================================================================
// OPENING HOURS
// ============================================================================

export async function getOpeningHours() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('openinghours')
    .select('*')
    .order('day_of_week', { ascending: true });
  
  if (error) throw error;
  return data;
}

export async function updateOpeningHours(id: string, updates: {
  morning_start?: string | null;
  morning_end?: string | null;
  afternoon_start?: string | null;
  afternoon_end?: string | null;
  is_closed: boolean;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('openinghours')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// ============================================================================
// VACATIONS
// ============================================================================

export async function getVacations() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vacations')
    .select('*')
    .order('start_date', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function createVacation(vacation: {
  start_date: string;
  end_date: string;
  description?: string;
  emergency_contact?: string;
  is_active: boolean;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vacations')
    .insert([vacation])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateVacation(id: string, updates: Partial<{
  start_date: string;
  end_date: string;
  description: string;
  emergency_contact: string;
  is_active: boolean;
}>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('vacations')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteVacation(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('vacations')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// ============================================================================
// CONTACT MESSAGES
// ============================================================================

export async function getContactMessages() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('contactmessages')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function markMessageAsRead(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('contactmessages')
    .update({ is_read: true })
    .eq('id', id);
  
  if (error) throw error;
}
