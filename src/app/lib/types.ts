// src/app/lib/types.ts

// Öffnungszeiten
export interface OpeningHour {
  id: string;
  weekday: number; // 1-7 (Montag=1, Sonntag=7)
  label: string;
  morning_from: string | null;
  morning_to: string | null;
  afternoon_from: string | null;
  afternoon_to: string | null;
  is_closed: boolean;
  created_at?: string;
  updated_at?: string;
}

// Urlaube
export interface Vacation {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  notes: string | null;
  created_at?: string;
  updated_at?: string;
}

// Vertretungen
export interface Substitute {
  id: string;
  vacation_id: string;
  name: string;
  street: string;
  city: string;
  phone: string;
  notes: string | null;
  created_at?: string;
}

// Hinweise / Announcements
export interface Announcement {
  id: string;
  title: string;
  content: string;
  is_pinned: boolean;
  created_at?: string;
  updated_at?: string;
}

// Kontaktanfragen (exakt nach Supabase-Spalten)
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string; // 'new' | 'in_progress' | 'done'
  createdat: string; // timestamp with time zone
}
