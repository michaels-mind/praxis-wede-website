// src/app/(admin)/admin/opening-hours/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getOpeningHours, updateOpeningHours } from '../../../lib/admin';

type OpeningHour = {
  id: string;
  day_of_week: number;
  morning_start: string | null;
  morning_end: string | null;
  afternoon_start: string | null;
  afternoon_end: string | null;
  is_closed: boolean;
};

const DAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

export default function OpeningHoursPage() {
  const [hours, setHours] = useState<OpeningHour[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    loadHours();
  }, []);

  async function loadHours() {
    try {
      const data = await getOpeningHours();
      setHours(data);
    } catch (error) {
      console.error('Error loading hours:', error);
      alert('Fehler beim Laden');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(id: string, updates: Partial<OpeningHour>) {
    setSaving(id);
    try {
      // ✅ Korrekt: Kein 'as any', da updates bereits Partial<OpeningHour> ist
      await updateOpeningHours(id, updates);
      await loadHours();
      alert('Gespeichert!');
    } catch (error) {
      console.error('Error updating:', error);
      alert('Fehler beim Speichern');
    } finally {
      setSaving(null);
    }
  }

  if (loading) {
    return <div className="text-center py-12">Lädt...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Öffnungszeiten</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {hours.map((hour) => (
            <DayRow
              key={hour.id}
              hour={hour}
              dayName={DAYS[hour.day_of_week]}
              onUpdate={(updates) => handleUpdate(hour.id, updates)}
              isSaving={saving === hour.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DayRow({
  hour,
  dayName,
  onUpdate,
  isSaving,
}: {
  hour: OpeningHour;
  dayName: string;
  onUpdate: (updates: Partial<OpeningHour>) => void;
  isSaving: boolean;
}) {
  const [formData, setFormData] = useState(hour);

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <div className="p-6">
      <div className="flex items-start gap-6">
        {/* Day Name */}
        <div className="w-32">
          <h3 className="text-lg font-semibold text-gray-900">{dayName}</h3>
        </div>

        {/* Closed Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.is_closed}
            onChange={(e) => setFormData({ ...formData, is_closed: e.target.checked })}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label className="ml-2 text-sm text-gray-700">Geschlossen</label>
        </div>

        {/* Time Inputs */}
        {!formData.is_closed && (
          <div className="flex-1 grid grid-cols-2 gap-6">
            {/* Morning */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vormittag
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={formData.morning_start || ''}
                  onChange={(e) => setFormData({ ...formData, morning_start: e.target.value || null })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
                <span className="text-gray-500">bis</span>
                <input
                  type="time"
                  value={formData.morning_end || ''}
                  onChange={(e) => setFormData({ ...formData, morning_end: e.target.value || null })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Afternoon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nachmittag
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={formData.afternoon_start || ''}
                  onChange={(e) => setFormData({ ...formData, afternoon_start: e.target.value || null })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
                <span className="text-gray-500">bis</span>
                <input
                  type="time"
                  value={formData.afternoon_end || ''}
                  onChange={(e) => setFormData({ ...formData, afternoon_end: e.target.value || null })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {isSaving ? 'Speichert...' : 'Speichern'}
        </button>
      </div>
    </div>
  );
}
