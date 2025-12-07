// src/app/admin/vacations/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getVacations } from '../../lib/queries';
import type { Vacation } from '../../lib/types';

export default function AdminVacationsPage() {
  const [items, setItems] = useState<Vacation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVacations();
        setItems(data);
        setLoadError(null);
      } catch (error) {
        setLoadError('Die Urlaubszeiten konnten nicht geladen werden.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <header className="page-header">
        <h1 id="admin-vacations-heading" className="page-title">
          Urlaube und Vertretungen
        </h1>
        <p className="page-intro">
          Hier sehen Sie die hinterlegten Urlaubszeiten der Praxis. Die
          Bearbeitung und Vertretungsärzte ergänzen wir in einem weiteren
          Schritt.
        </p>
      </header>

      <section
        aria-labelledby="admin-vacations-heading"
        className="home-section"
      >
        {isLoading && <p>Einträge werden geladen …</p>}
        {loadError && <p className="form-error">{loadError}</p>}

        {!isLoading && !loadError && items.length === 0 && (
          <p>Derzeit sind keine Urlaubszeiten hinterlegt.</p>
        )}

        {!isLoading && !loadError && items.length > 0 && (
          <ul className="admin-list">
            {items.map((vac) => (
              <li key={vac.id} className="admin-list-item">
                <h2 className="admin-list-title">{vac.title}</h2>
                <p className="admin-list-text">
  Zeitraum: {vac.start_date} bis {vac.end_date}
</p>
                {vac.notes && (
                  <p className="admin-list-text">{vac.notes}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
