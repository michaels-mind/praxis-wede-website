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
    return <div className='loading-spinner'>Lädt...</div>;
  }

  return (
    <div className='vacations-list'>
      {vacations.length === 0 ? (
        <p className='empty-state'>Keine Urlaube geplant</p>
      ) : (
        <div className='vacations-grid'>
          {vacations.map((vacation) => {
            const days = getDaysBetween(vacation.start_date, vacation.end_date);
            const isUpcoming = new Date(vacation.start_date) > new Date();
            const isCurrent = new Date() >= new Date(vacation.start_date) && new Date() <= new Date(vacation.end_date);
            
            return (
              <div 
                key={vacation.id} 
                className={`vacation-card ${isCurrent ? 'current' : ''} ${isUpcoming ? 'upcoming' : ''}`}
              >
                <div className='vacation-header'>
                  <div className='vacation-dates'>
                    <span className='date-badge'>📅 {formatDate(vacation.start_date)}</span>
                    <span className='separator'>→</span>
                    <span className='date-badge'>📅 {formatDate(vacation.end_date)}</span>
                  </div>
                  <span className='days-badge'>{days} {days === 1 ? 'Tag' : 'Tage'}</span>
                </div>

                {isCurrent && (
                  <div className='current-badge'>
                    🔴 Aktuell geschlossen
                  </div>
                )}

                <div className='vacation-reason'>
                  <strong>Grund:</strong> {vacation.reason}
                </div>

                <button 
                  className='btn-delete-vacation'
                  onClick={() => handleDelete(vacation.id)}
                >
                  🗑️ Löschen
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
