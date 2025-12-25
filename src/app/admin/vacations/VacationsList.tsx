'use client';

import { useState, useEffect } from 'react';

// 🎯 KORREKTUR: Interface exakt an Tabelle 'vacations' angepasst
interface VacationAnnouncement {
  id: string;
  start_date: string; // war valid_from
  end_date: string;   // war valid_until
  description: string;
  created_at: string;
}

export function VacationsList() {
  const [vacations, setVacations] = useState<VacationAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVacations();
  }, []);

  const loadVacations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/vacations', { cache: 'no-store' });
      const result = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        setVacations(result.data);
      } else {
        setVacations([]);
      }
    } catch (error) {
      console.error('Load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Wirklich löschen?')) return;
    
    try {
      const response = await fetch('/api/admin/vacations', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        // UI-Optimierung: Liste filtern statt neu laden
        setVacations(prev => prev.filter(v => v.id !== id));
      } else {
        alert('Fehler beim Löschen');
      }
    } catch (e) {
      alert('Fehler beim Löschen');
    }
  };

  if (loading) return <div className="text-sm text-gray-500 p-4 text-center">Lädt Urlaube...</div>;

  if (vacations.length === 0) return (
    <div className="text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
      <p className="text-gray-500 italic text-sm">Keine Urlaube eingetragen.</p>
    </div>
  );

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {vacations.map((vac) => (
        <div key={vac.id} className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="block text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Zeitraum</span>
              <div className="text-sm font-medium text-gray-900 bg-blue-50 inline-block px-2 py-1 rounded">
                {new Date(vac.start_date).toLocaleDateString('de-DE')} 
                <span className="mx-1 text-gray-400">bis</span> 
                {new Date(vac.end_date).toLocaleDateString('de-DE')}
              </div>
            </div>
            <button 
              onClick={() => handleDelete(vac.id)}
              className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors"
              title="Löschen"
            >
              🗑️
            </button>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-700 font-medium">{vac.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
