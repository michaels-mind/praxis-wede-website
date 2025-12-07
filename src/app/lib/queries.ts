// src/app/lib/queries.ts
import { supabase } from './supabaseClient';
import type {
  OpeningHour,
  ContactMessage,
  Vacation,
  Announcement,
} from './types';

// Öffnungszeiten
export async function getOpeningHours(): Promise<OpeningHour[]> {
  const { data, error } = await supabase
    .from('openinghours')
    .select('*')
    .order('weekday');
  if (error) throw error;
  return data || [];
}

// Urlaube
export async function getVacations(): Promise<Vacation[]> {
  const { data, error } = await supabase
    .from('vacations')
    .select('*')
    .order('startdate', { ascending: true }); // Spaltenname an Supabase angepasst
  if (error) throw error;
  return data || [];
}

// Aktive Urlaube
export async function getActiveVacations(): Promise<Vacation[]> {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from('vacations')
    .select('*')
    .lte('startdate', today) // Spaltenname an Supabase angepasst
    .gte('enddate', today);  // Spaltenname an Supabase angepasst
  if (error) throw error;
  return data || [];
}

// Announcements
export async function getAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('ispinned', { ascending: false })
    .order('createdat', { ascending: false });
  if (error) throw error;
  return data || [];
}

// Kontaktanfragen erstellen
type CreateContactMessageInput = Omit<ContactMessage, 'id' | 'createdat'>;

export async function createContactMessage(
  formData: CreateContactMessageInput
): Promise<ContactMessage> {
  const { data, error } = await supabase
    .from('contactmessages')
    .insert({
      ...formData,
      status: 'new',
    })
    .select()
    .single();
  if (error) throw error;
  return data as ContactMessage;
}

// Kontaktanfragen lesen
export async function getContactMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabase
    .from('contactmessages')
    .select('*')
    .order('createdat', { ascending: false });
  if (error) throw error;
  return data || [];
}

// Kontaktanfrage löschen
export async function deleteContactMessage(id: string): Promise<void> {
  const { error } = await supabase
    .from('contactmessages')
    .delete()
    .eq('id', id);
  if (error) throw error;
}
