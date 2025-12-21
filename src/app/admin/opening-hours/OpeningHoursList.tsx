'use client';

import { useState, useEffect } from 'react';
import { getOpeningHours, updateOpeningHours } from '@/lib/admin';

interface OpeningHour {
  id: string;
  morning_start: string | null;
  morning_end: string | null;
  is_closed: boolean;
}

const DAYS = [
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
  'Sonntag',
];

export function OpeningHoursList() {
  const [hours, setHours] = useState<OpeningHour[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    open_time: '',
    close_time: '',
    is_open: true,
  });

  useEffect(() => {
    loadHours();
  }, []);

  const loadHours = async () => {
    setLoading(true);
    const data = await getOpeningHours();
    setHours(data || []);
    setLoading(false);
  };

  const startEdit = (hour: OpeningHour) => {
    setEditingId(hour.id);
    setEditData({
      open_time: hour.morning_start ? hour.morning_start.slice(0, 5) : '',
      close_time: hour.morning_end ? hour.morning_end.slice(0, 5) : '',
      is_open: !hour.is_closed,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ open_time: '', close_time: '', is_open: true });
  };

  const saveEdit = async (id: string) => {
    try {
      await updateOpeningHours(id, {
        open_time: editData.open_time,
        close_time: editData.close_time,
        is_open: editData.is_open,
      });
      await loadHours();
      cancelEdit();
    } catch (error) {
      console.error('Update error:', error);
      alert('Fehler beim Speichern');
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Lädt...</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Wochentag
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Öffnungszeit
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Schließungszeit
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Aktionen
            </th>
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, index) => {
            const isClosed = hour.is_closed;

            return (
              <tr
                key={hour.id}
                className={`border-t border-gray-100 ${
                  isClosed ? 'bg-gray-50/80' : 'bg-white'
                }`}
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-800">
                  {DAYS[index] || `Tag ${index + 1}`}
                </td>

                {editingId === hour.id ? (
                  <>
                    <td className="px-4 py-3">
                      <input
                        type="time"
                        value={editData.open_time}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            open_time: e.target.value,
                          })
                        }
                        className="form-input w-full"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="time"
                        value={editData.close_time}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            close_time: e.target.value,
                          })
                        }
                        className="form-input w-full"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={editData.is_open}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              is_open: e.target.checked,
                            })
                          }
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>
                          {editData.is_open ? 'Geöffnet' : 'Geschlossen'}
                        </span>
                      </label>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                          onClick={() => saveEdit(hour.id)}
                        >
                          ✅ Speichern
                        </button>
                        <button
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                          onClick={cancelEdit}
                        >
                          ❌ Abbrechen
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {hour.morning_start
                        ? hour.morning_start.slice(0, 5)
                        : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {hour.morning_end ? hour.morning_end.slice(0, 5) : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          !hour.is_closed
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {!hour.is_closed ? '✅ Geöffnet' : '❌ Geschlossen'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                        onClick={() => startEdit(hour)}
                      >
                        ✏️ Bearbeiten
                      </button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
