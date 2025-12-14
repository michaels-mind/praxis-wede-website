'use client';

import { useState, useEffect } from 'react';
import { getOpeningHours, updateOpeningHours } from '@/lib/admin';

interface OpeningHour {
  id: string;
  open_time: string;
  close_time: string;
  is_open: boolean;
}

const DAYS = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

export function OpeningHoursList() {
  const [hours, setHours] = useState<OpeningHour[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ open_time: '', close_time: '', is_open: true });

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
      open_time: hour.open_time || '',
      close_time: hour.close_time || '',
      is_open: hour.is_open,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ open_time: '', close_time: '', is_open: true });
  };

  const saveEdit = async (id: string) => {
    try {
      await updateOpeningHours(id, editData);
      await loadHours();
      cancelEdit();
    } catch (error) {
      console.error('Update error:', error);
      alert('Fehler beim Speichern');
    }
  };

  if (loading) {
    return <div className='loading-spinner'>Lädt...</div>;
  }

  return (
    <div className='hours-table-container'>
      <table className='hours-table'>
        <thead>
          <tr>
            <th>Wochentag</th>
            <th>Öffnungszeit</th>
            <th>Schließungszeit</th>
            <th>Status</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, index) => (
            <tr key={hour.id} className={!hour.is_open ? 'closed-day' : ''}>
              <td className='day-cell'>
                <strong>{DAYS[index] || `Tag ${index + 1}`}</strong>
              </td>
              
              {editingId === hour.id ? (
                <>
                  <td>
                    <input
                      type='time'
                      value={editData.open_time}
                      onChange={(e) => setEditData({ ...editData, open_time: e.target.value })}
                      className='time-input'
                    />
                  </td>
                  <td>
                    <input
                      type='time'
                      value={editData.close_time}
                      onChange={(e) => setEditData({ ...editData, close_time: e.target.value })}
                      className='time-input'
                    />
                  </td>
                  <td>
                    <label className='toggle-switch'>
                      <input
                        type='checkbox'
                        checked={editData.is_open}
                        onChange={(e) => setEditData({ ...editData, is_open: e.target.checked })}
                      />
                      <span className='toggle-slider'></span>
                      {editData.is_open ? 'Geöffnet' : 'Geschlossen'}
                    </label>
                  </td>
                  <td>
                    <div className='action-buttons'>
                      <button className='btn-save' onClick={() => saveEdit(hour.id)}>
                        ✅ Speichern
                      </button>
                      <button className='btn-cancel' onClick={cancelEdit}>
                        ❌ Abbrechen
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{hour.open_time || '-'}</td>
                  <td>{hour.close_time || '-'}</td>
                  <td>
                    <span className={`status-badge ${hour.is_open ? 'open' : 'closed'}`}>
                      {hour.is_open ? '✅ Geöffnet' : '❌ Geschlossen'}
                    </span>
                  </td>
                  <td>
                    <button className='btn-edit-small' onClick={() => startEdit(hour)}>
                      ✏️ Bearbeiten
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
