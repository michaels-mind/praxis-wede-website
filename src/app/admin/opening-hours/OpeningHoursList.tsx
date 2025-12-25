'use client';

import { useState, useEffect } from 'react';

// 🎯 KORREKTUR: Interface an DB angepasst (day_of_week statt day)
interface OpeningHour {
  id: string;
  day_of_week: number;
  morning_start: string | null;
  morning_end: string | null;
  afternoon_start: string | null;
  afternoon_end: string | null;
  is_closed: boolean;
}

const DAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

export function OpeningHoursList() {
  const [hours, setHours] = useState<OpeningHour[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<OpeningHour>>({});

  useEffect(() => {
    loadHours();
  }, []);

  const loadHours = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/opening-hours', { cache: 'no-store' });
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        // UI-Optimierung: Sortieren, damit Montag (1) oben steht und Sonntag (0) unten
        const sortedHours = result.data.sort((a: OpeningHour, b: OpeningHour) => {
           // Verschiebe 0 (Sonntag) ans Ende (als 7 behandeln)
           const dayA = a.day_of_week === 0 ? 7 : a.day_of_week;
           const dayB = b.day_of_week === 0 ? 7 : b.day_of_week;
           return dayA - dayB;
        });
        setHours(sortedHours);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (hour: OpeningHour) => {
    setEditingId(hour.id);
    setEditData({
      morning_start: hour.morning_start,
      morning_end: hour.morning_end,
      afternoon_start: hour.afternoon_start, // Auch Nachmittag bearbeitbar machen!
      afternoon_end: hour.afternoon_end,     // Auch Nachmittag bearbeitbar machen!
      is_closed: hour.is_closed,
    });
  };

  const saveEdit = async (id: string) => {
    try {
      const response = await fetch('/api/admin/opening-hours', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...editData }),
      });
      const result = await response.json();
      
      if (result.success) {
        setEditingId(null);
        await loadHours();
      } else {
        alert('Fehler: ' + (result.error || 'Unbekannter Fehler'));
      }
    } catch (e) {
      alert('Speichern fehlgeschlagen');
    }
  };

  if (loading) return <div className="p-4 text-center text-gray-500">Lädt Öffnungszeiten...</div>;

  return (
    <div className="bg-white border rounded shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3 text-gray-700 font-semibold">Tag</th>
            <th className="p-3 text-gray-700 font-semibold">Vormittag</th>
            <th className="p-3 text-gray-700 font-semibold">Nachmittag</th>
            <th className="p-3 text-gray-700 font-semibold">Status</th>
            <th className="p-3 text-gray-700 font-semibold text-right">Aktion</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {hours.map((hour) => {
            const isEditing = editingId === hour.id;
            // day_of_week nutzen!
            const dayName = DAYS[hour.day_of_week] || 'Unbekannt'; 

            return (
              <tr key={hour.id} className={hour.is_closed ? 'bg-gray-50/50' : 'hover:bg-gray-50'}>
                <td className="p-3 font-medium text-gray-900">{dayName}</td>
                
                {isEditing ? (
                  <>
                    <td className="p-3">
                      <div className="flex gap-1 items-center">
                        <input type="time" className="border rounded px-1 py-1 text-xs w-20"
                          value={editData.morning_start?.slice(0,5) || ''}
                          disabled={editData.is_closed}
                          onChange={e => setEditData({...editData, morning_start: e.target.value})}
                        />
                        <span className="text-gray-400">-</span>
                        <input type="time" className="border rounded px-1 py-1 text-xs w-20"
                          value={editData.morning_end?.slice(0,5) || ''}
                          disabled={editData.is_closed}
                          onChange={e => setEditData({...editData, morning_end: e.target.value})}
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1 items-center">
                        <input type="time" className="border rounded px-1 py-1 text-xs w-20"
                          value={editData.afternoon_start?.slice(0,5) || ''}
                          disabled={editData.is_closed}
                          onChange={e => setEditData({...editData, afternoon_start: e.target.value})}
                        />
                        <span className="text-gray-400">-</span>
                        <input type="time" className="border rounded px-1 py-1 text-xs w-20"
                          value={editData.afternoon_end?.slice(0,5) || ''}
                          disabled={editData.is_closed}
                          onChange={e => setEditData({...editData, afternoon_end: e.target.value})}
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                        <input type="checkbox"
                          className="rounded text-blue-600 focus:ring-blue-500"
                          checked={editData.is_closed || false}
                          onChange={e => setEditData({...editData, is_closed: e.target.checked})}
                        />
                        <span className={editData.is_closed ? "text-red-600 font-medium" : "text-gray-600"}>
                          Geschlossen
                        </span>
                      </label>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => saveEdit(hour.id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition-colors">Speichern</button>
                        <button onClick={() => setEditingId(null)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs transition-colors">Abbrechen</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-3 text-gray-600">
                      {hour.is_closed ? '-' : (
                        hour.morning_start ? `${hour.morning_start.slice(0,5)} - ${hour.morning_end?.slice(0,5)}` : '-'
                      )}
                    </td>
                    <td className="p-3 text-gray-600">
                      {hour.is_closed ? '-' : (
                        hour.afternoon_start ? `${hour.afternoon_start.slice(0,5)} - ${hour.afternoon_end?.slice(0,5)}` : '-'
                      )}
                    </td>
                    <td className="p-3">
                      {hour.is_closed 
                        ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Geschlossen</span>
                        : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Geöffnet</span>
                      }
                    </td>
                    <td className="p-3 text-right">
                      <button onClick={() => startEdit(hour)} className="text-blue-600 hover:text-blue-900 text-sm font-medium transition-colors">
                        Bearbeiten
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
