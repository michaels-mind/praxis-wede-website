// src/app/admin/announcements/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getAnnouncements } from '../../lib/queries';
import type { Announcement } from '../../lib/types';

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAnnouncements();
        setItems(data);
        setLoadError(null);
      } catch (error) {
        setLoadError('Die Hinweise konnten nicht geladen werden.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <header className="page-header">
        <h1 id="admin-announcements-heading" className="page-title">
          Hinweise verwalten
        </h1>
        <p className="page-intro">
          Hier sehen Sie die aktuell veröffentlichten Hinweise. Die Bearbeitung
          und das Anlegen neuer Einträge ergänzen wir in einem zweiten Schritt.
        </p>
      </header>

      <section
        aria-labelledby="admin-announcements-heading"
        className="home-section"
      >
        {isLoading && <p>Hinweise werden geladen …</p>}
        {loadError && <p className="form-error">{loadError}</p>}

        {!isLoading && !loadError && items.length === 0 && (
          <p>Derzeit sind keine Hinweise hinterlegt.</p>
        )}

        {!isLoading && !loadError && items.length > 0 && (
          <ul className="admin-list">
            {items.map((item) => (
              <li key={item.id} className="admin-list-item">
                <div className="admin-list-header">
                  <h2 className="admin-list-title">{item.title}</h2>
                  {item.is_pinned && (
                    <span className="admin-badge">angeheftet</span>
                  )}
                </div>
                <p className="admin-list-text">{item.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
