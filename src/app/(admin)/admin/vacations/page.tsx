// src/app/(admin)/admin/vacations/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getVacations, createVacation, updateVacation, deleteVacation } from '../../../lib/admin';

type Vacation = {
  id: string;
  start_date: string;
  end_date: string;
  description: string | null;
  emergency_contact: string | null;
  is_active: boolean;
  created_at: string;
};

export default function VacationsPage() {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    description: '',
    emergency_contact: '',
    is_active: true,
  });

  useEffect(() => {
    loadVacations();
  }, []);

  async function loadVacations() {
    try {
      const data = await getVacations();
      setVacations(data);
    } catch (error) {
      console.error('Error loading vacations:', error);
      alert('Fehler beim Laden der Urlaube');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await updateVacation(editingId, formData);
      } else {
        await createVacation(formData);
      }

      resetForm();
      await loadVacations();
      alert(editingId ? 'Urlaub aktualisiert!' : 'Urlaub erstellt!');
    } catch (error) {
      console.error('Error saving vacation:', error);
      alert('Fehler beim Speichern');
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(vacation: Vacation) {
    setFormData({
      start_date: vacation.start_date,
      end_date: vacation.end_date,
      description: vacation.description || '',
      emergency_contact: vacation.emergency_contact || '',
      is_active: vacation.is_active,
    });
    setEditingId(vacation.id);
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Wirklich löschen?')) return;

    try {
      await deleteVacation(id);
      await loadVacations();
      alert('Urlaub gelöscht!');
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Fehler beim Löschen');
    }
  }

  function resetForm() {
    setFormData({
      start_date: '',
      end_date: '',
      description: '',
      emergency_contact: '',
      is_active: true,
    });
    setEditingId(null);
    setShowForm(false);
  }

  // Unterscheidung zwischen zukünftigen und vergangenen Urlauben
  const today = new Date().toISOString().split('T')[0];
  const upcomingVacations = vacations.filter((v) => v.end_date >= today);
  const pastVacations = vacations.filter((v) => v.end_date < today);

  if (loading && vacations.length === 0) {
    return <div className="text-center py-12">Lädt...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Urlaubszeiten</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          {showForm ? 'Abbrechen' : '+ Neuer Urlaub'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Urlaub bearbeiten' : 'Neuer Urlaub'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Startdatum *
                </label>
                <input
                  type="date"
                  required
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enddatum *
                </label>
                <input
                  type="date"
                  required
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Beschreibung (z.B. &quot;Weihnachtsferien&quot;)
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notfall-Kontakt / Vertretung
              </label>
              <textarea
                rows={3}
                value={formData.emergency_contact}
                onChange={(e) => setFormData({ ...formData, emergency_contact: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                placeholder="z.B. Dr. Müller, Tel: 05021-123456"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                Aktiv (auf Website anzeigen)
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Speichert...' : 'Speichern'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Kommende Urlaube */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-green-50 px-6 py-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Kommende / Aktuelle Urlaube ({upcomingVacations.length})
          </h2>
        </div>
        {upcomingVacations.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Keine kommenden Urlaube
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {upcomingVacations.map((vacation) => (
              <VacationCard
                key={vacation.id}
                vacation={vacation}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Vergangene Urlaube */}
      {pastVacations.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Vergangene Urlaube ({pastVacations.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {pastVacations.map((vacation) => (
              <VacationCard
                key={vacation.id}
                vacation={vacation}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isPast
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function VacationCard({
  vacation,
  onEdit,
  onDelete,
  isPast = false,
}: {
  vacation: Vacation;
  onEdit: (vacation: Vacation) => void;
  onDelete: (id: string) => void;
  isPast?: boolean;
}) {
  return (
    <div className={`p-6 hover:bg-gray-50 ${isPast ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {vacation.description || 'Urlaub'}
            </h3>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                vacation.is_active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {vacation.is_active ? 'Aktiv' : 'Inaktiv'}
            </span>
            {isPast && (
              <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-600">
                Vergangen
              </span>
            )}
          </div>

          <div className="mt-2 text-gray-700">
            <p className="font-medium">
              📅 {formatDate(vacation.start_date)} bis {formatDate(vacation.end_date)}
            </p>
            {vacation.emergency_contact && (
              <p className="mt-1 text-sm text-gray-600">
                🚨 Notfall: {vacation.emergency_contact}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(vacation)}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            Bearbeiten
          </button>
          <button
            onClick={() => onDelete(vacation.id)}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Löschen
          </button>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
