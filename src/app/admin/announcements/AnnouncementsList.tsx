'use client';

import { useState, useEffect } from 'react';

interface Announcement {
  id: string;
  title: string;
  description: string;
  valid_from?: string;
  valid_until?: string;
  created_at: string;
}

export function AnnouncementsList() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    setLoading(true);
    try {
      // 🎯 WICHTIG: Rufe die API-Route auf statt lib/admin direkt
      const response = await fetch('/api/admin/announcements');
      const result = await response.json();
      setAnnouncements(result.data || []);
    } catch (error) {
      console.error('Load error:', error);
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Ankündigung wirklich löschen?')) return;

    try {
      // 🎯 WICHTIG: Rufe die API-Route auf statt lib/admin direkt
      const response = await fetch('/api/admin/announcements', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Löschen');
      }

      alert('✅ Ankündigung gelöscht! Die Website wird aktualisiert...');
      await loadAnnouncements();
    } catch (error) {
      console.error('Delete error:', error);
      alert('❌ Fehler beim Löschen');
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Lädt...</div>;
  }

  if (announcements.length === 0) {
    return (
      <p className="text-sm text-gray-500 italic">
        Keine Ankündigungen vorhanden.
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {announcements.map((announcement) => (
        <article
          key={announcement.id}
          className="card bg-white/90 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-sm font-semibold text-gray-900">
              {announcement.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>
                Erstellt:{' '}
                {new Date(announcement.created_at).toLocaleDateString('de-DE')}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-800 mb-4">
            {announcement.description}
          </p>

          {(announcement.valid_from || announcement.valid_until) && (
            <div className="mb-4 text-xs text-gray-600 space-x-1">
              {announcement.valid_from && (
                <span>
                  Gültig ab:{' '}
                  {new Date(announcement.valid_from).toLocaleDateString(
                    'de-DE',
                  )}
                </span>
              )}
              {announcement.valid_until && (
                <span>
                  · Gültig bis:{' '}
                  {new Date(announcement.valid_until).toLocaleDateString(
                    'de-DE',
                  )}
                </span>
              )}
            </div>
          )}

          <div className="mt-auto flex flex-wrap gap-2">
            <button
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 cursor-not-allowed"
              onClick={() => alert('Bearbeiten-Funktion folgt später')}
            >
              ✏️ Bearbeiten
            </button>
            <button
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              onClick={() => handleDelete(announcement.id)}
            >
              🗑️ Löschen
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
