// src/app/admin/opening-hours/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getOpeningHours } from '../../lib/queries';
import type { OpeningHour } from '../../lib/types';
import { formatTime } from '../../lib/utils';

export default function AdminOpeningHoursPage() {
  const [rows, setRows] = useState<OpeningHour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOpeningHours();
        setRows(data);
        setLoadError(null);
      } catch (error) {
        setLoadError('Die Öffnungszeiten konnten nicht geladen werden.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <header className="page-header">
        <h1 id="admin-opening-hours-heading" className="page-title">
          Öffnungszeiten verwalten
        </h1>
        <p className="page-intro">
          Hier sehen Sie die aktuell hinterlegten Sprechzeiten der Praxis.
          Die Bearbeitung der Zeiten ergänzen wir in einem zweiten Schritt.
        </p>
      </header>

      <section
        aria-labelledby="admin-opening-hours-heading"
        className="home-section"
      >
        {isLoading && <p>Öffnungszeiten werden geladen …</p>}
        {loadError && <p className="form-error">{loadError}</p>}

        {!isLoading && !loadError && (
          <table className="opening-hours-table">
            <thead>
              <tr>
                <th scope="col">Tag</th>
                <th scope="col">Vormittag</th>
                <th scope="col">Nachmittag</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <th scope="row">{row.label}</th>
                  <td>
                    {row.is_closed || !row.morning_from || !row.morning_to
                      ? '–'
                      : `${formatTime(row.morning_from)}–${formatTime(
                          row.morning_to,
                        )}`}
                  </td>
                  <td>
                    {row.is_closed || !row.afternoon_from || !row.afternoon_to
                      ? '–'
                      : `${formatTime(row.afternoon_from)}–${formatTime(
                          row.afternoon_to,
                        )}`}
                  </td>
                  <td>{row.is_closed ? 'geschlossen' : 'offen'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
