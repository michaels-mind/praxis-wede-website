'use client';

import { useState, useEffect } from 'react';
import { getAnnouncements, deleteAnnouncement } from '@/lib/admin';

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
    const data = await getAnnouncements();
    setAnnouncements(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Ankündigung wirklich löschen?')) return;
    
    try {
      await deleteAnnouncement(id);
      await loadAnnouncements();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Fehler beim Löschen');
    }
  };

  if (loading) {
    return <div className='loading-spinner'>Lädt...</div>;
  }

  return (
    <div className='announcements-list'>
      {announcements.length === 0 ? (
        <p className='empty-state'>Keine Ankündigungen vorhanden</p>
      ) : (
        <div className='announcements-grid'>
          {announcements.map((announcement) => (
            <div key={announcement.id} className='announcement-card'>
              <div className='announcement-header'>
                <h3>{announcement.title}</h3>
                <div className='announcement-actions'>
                  <button 
                    className='btn-edit'
                    onClick={() => alert('Edit coming soon')}
                  >
                    ✏️ Bearbeiten
                  </button>
                  <button 
                    className='btn-delete'
                    onClick={() => handleDelete(announcement.id)}
                  >
                    🗑️ Löschen
                  </button>
                </div>
              </div>
              <p className='announcement-description'>{announcement.description}</p>
              <div className='announcement-meta'>
                <span>Erstellt: {new Date(announcement.created_at).toLocaleDateString('de-DE')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
