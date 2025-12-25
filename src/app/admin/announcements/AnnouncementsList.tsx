'use client';

import { useState, useEffect } from 'react';

// 🎯 KORREKTUR: Interface an DB angepasst
interface Announcement {
  id: string;
  title: string;
  content: string; // DB Feld heißt content
  start_date?: string; // DB Feld heißt start_date
  end_date?: string;   // DB Feld heißt end_date
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
      const response = await fetch('/api/admin/announcements', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Löschen');
      }

      // UI-Optimierung: Liste lokal filtern statt neu zu laden (schneller)
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      alert('✅ Ankündigung gelöscht!');
    } catch (error) {
      console.error('Delete error:', error);
      alert('❌ Fehler beim Löschen');
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500 p-4 text-center">Lädt Ankündigungen...</div>;
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500">Keine Ankündigungen vorhanden.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {announcements.map((announcement) => (
        <article
          key={announcement.id}
          className="card bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full"
        >
          <div className="p-5 flex flex-col h-full">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-base font-bold text-gray-900 line-clamp-2">
                {announcement.title}
              </h3>
              <span className="text-xs text-gray-400 whitespace-nowrap bg-gray-50 px-2 py-1 rounded">
                {new Date(announcement.created_at).toLocaleDateString('de-DE')}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-6 flex-grow line-clamp-3">
              {announcement.content} {/* 🎯 Nutzung von content */}
            </p>

            {(announcement.start_date || announcement.end_date) && (
              <div className="mb-5 text-xs text-blue-600 bg-blue-50 p-2 rounded-lg flex flex-col gap-1">
                {announcement.start_date && (
                  <span>
                    📅 Von: {new Date(announcement.start_date).toLocaleDateString('de-DE')}
                  </span>
                )}
                {announcement.end_date && (
                  <span>
                    ⏳ Bis: {new Date(announcement.end_date).toLocaleDateString('de-DE')}
                  </span>
                )}
              </div>
            )}

            <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
              <button
                className="text-xs font-medium text-gray-500 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                onClick={() => alert('Bearbeiten folgt in Kürze')}
              >
                ✏️ Bearbeiten
              </button>
              <button
                className="text-xs font-medium text-red-600 hover:text-red-700 px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors bg-white border border-red-100"
                onClick={() => handleDelete(announcement.id)}
              >
                🗑️ Löschen
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
