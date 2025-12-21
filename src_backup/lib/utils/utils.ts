export const getWeekdayName = (weekday: number): string => {
  const weekdays = ['', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
  return weekdays[weekday] || '';
};

export const formatTime = (time: string | null): string => {
  if (!time) return '';
  return time.substring(0, 5); // "HH:MM" aus "HH:MM:SS"
};

export const isVacationActive = (vacation: { start_date: string; end_date: string }): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(vacation.start_date);
  const end = new Date(vacation.end_date);
  return today >= start && today <= end;
};
