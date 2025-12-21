export type Announcement = {
  id: string;
  title: string;
  content: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type OpeningHour = {
  id: string;
  day_of_week: number;
  morning_start: string | null;
  morning_end: string | null;
  afternoon_start: string | null;
  afternoon_end: string | null;
  is_closed: boolean;
  created_at: string;
  updated_at: string;
};

export type Vacation = {
  id: string;
  start_date: string;
  end_date: string;
  description: string | null;
  emergency_contact: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
  archived_at: string | null;
};
