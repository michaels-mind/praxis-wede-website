'use client';

import { useEffect, useState } from 'react';
import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../../../lib/admin';

type Announcement = {
  id: string;
  title: string;
  content: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    start_date: '',
    end_date: '',
    is_active: true,
  });

  useEffect(() => {
    loadAnnouncements();
  }, []);

  async function loadAnnouncements() {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error('Error loading announcements:', error);
      alert('Fehler beim Laden der Ankündigungen');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await updateAnnouncement(editingId, formData);
      } else {
        await createAnnouncement(formData);
      }
      
      resetForm();
      await loadAnnouncements();
      alert(editingId ? 'Ankündigung aktualisiert!' : 'Ankündigung erstellt!');
    } catch (error) {
      console.error('Error saving announcement:', error);
      alert('Fehler beim Speichern');
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(announcement: Announcement) {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      start_date: announcement.start_date,
      end_date: announcement.end_date,
      is_active: announcement.is_active,
    });
    setEditingId(announcement.id);
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Wirklich löschen?')) return;

    try {
      await deleteAnnouncement(id);
      await loadAnnouncements();
      alert('Ankündigung gelöscht!');
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Fehler beim Löschen');
    }
  }

  function resetForm() {
    setFormData({
      title: '',
      content: '',
      start_date: '',
      end_date: '',
      is_active: true,
    });
    setEditingId(null);
    setShowForm(false);
  }

  if (loading && announcements.length === 0) {
    return <div className="text-center py-12">Lädt...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Ankündigungen</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          {showForm ? 'Abbrechen' : '+ Neue Ankündigung'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Ankündigung bearbeiten' : 'Neue Ankündigung'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titel *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inhalt *
              </label>
              <textarea
                required
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>

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

      {/* Liste */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {announcements.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Keine Ankündigungen vorhanden
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {announcement.title}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          announcement.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {announcement.is_active ? 'Aktiv' : 'Inaktiv'}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">{announcement.content}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      {announcement.start_date} bis {announcement.end_date}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(announcement)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Bearbeiten
                    </button>
                    <button
                      onClick={() => handleDelete(announcement.id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      Löschen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
