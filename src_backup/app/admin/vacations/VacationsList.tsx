'use client';

import { useState, useEffect } from 'react';
import { getVacations, deleteVacation } from '@/lib/admin';

interface Vacation {
  id: string;
  start_date: string;
  end_date: string;
  reason: string;
  created_at: string;
}

export function VacationsList() {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVacations();
  }, []);

  const loadVacations = async () => {
    setLoading(true);
    const data = await getVacations();
    setVacations(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Urlaub wirklich löschen?')) return;

    try {
      await deleteVacation(id);
      await loadVacations();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Fehler beim Löschen');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getDaysBetween = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Lädt...</div>;
  }

  if (vacations.length === 0) {
    return (
      <p className="text-sm text-gray-500 italic">
        Aktuell sind keine Urlaube hinterlegt.
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {vacations.map((vacation) => {
        const days = getDaysBetween(vacation.start_date, vacation.end_date);
        const now = new Date();
        const isUpcoming = new Date(vacation.start_date) > now;
        const isCurrent =
          now >= new Date(vacation.start_date) &&
          now <= new Date(vacation.end_date);

        return (
          <article
            key={vacation.id}
            className={`card vacation-card relative ${
              isCurrent ? 'border-red-200 bg-red-50/40' : ''
            } ${isUpcoming ? 'border-amber-100 bg-amber-50/40' : ''}`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="px-2 py-1 rounded-full bg-white border border-gray-200 text-xs">
                  📅 {formatDate(vacation.start_date)}
                </span>
                <span className="text-gray-400 text-xs">bis</span>
                <span className="px-2 py-1 rounded-full bg-white border border-gray-200 text-xs">
                  📅 {formatDate(vacation.end_date)}
                </span>
              </div>
              <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                {days} {days === 1 ? 'Tag' : 'Tage'}
              </span>
            </div>

            {isCurrent && (
              <div className="mb-2 text-xs font-semibold text-red-700">
                🔴 Aktuell geschlossen
              </div>
            )}

            {isUpcoming && !isCurrent && (
              <div className="mb-2 text-xs font-semibold text-amber-700">
                ⏳ Bevorstehender Urlaub
              </div>
            )}

            <p className="text-sm text-gray-800 mb-4">
              <span className="font-semibold">Grund:</span>{' '}
              {vacation.reason}
            </p>

            <button
              type="button"
              className="text-xs font-medium text-red-600 hover:text-red-700 hover:underline"
              onClick={() => handleDelete(vacation.id)}
            >
              🗑️ Urlaub löschen
            </button>
          </article>
        );
      })}
    </div>
  );
}
