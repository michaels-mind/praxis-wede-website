'use client';

import { useState } from 'react';

interface AnnouncementFormProps {
  onSuccess: () => void;
}

export function AnnouncementForm({ onSuccess }: AnnouncementFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '', // ✅ WICHTIG: description statt content
    valid_from: '',
    valid_until: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert('Titel und Beschreibung sind erforderlich');
      return;
    }

    setIsSubmitting(true);
    try {
      // ✅ WICHTIG: Rufe die API-Route auf statt lib/admin direkt
      const response = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          valid_from: formData.valid_from || null,
          valid_until: formData.valid_until || null,
          is_active: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Speichern');
      }

      setFormData({
        title: '',
        description: '',
        valid_from: '',
        valid_until: '',
      });

      alert('✅ Ankündigung erstellt! Die Website wird aktualisiert...');
      onSuccess();
    } catch (error) {
      console.error('Create error:', error);
      alert('❌ Fehler beim Erstellen');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="form-label">
          Titel *
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          className="form-input w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="form-label">
          Beschreibung *
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="form-input w-full min-h-[120px]"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="valid_from" className="form-label">
            Gültig von (optional)
          </label>
          <input
            type="date"
            id="valid_from"
            value={formData.valid_from}
            onChange={(e) =>
              setFormData({ ...formData, valid_from: e.target.value })
            }
            className="form-input w-full"
          />
        </div>

        <div>
          <label htmlFor="valid_until" className="form-label">
            Gültig bis (optional)
          </label>
          <input
            type="date"
            id="valid_until"
            value={formData.valid_until}
            onChange={(e) =>
              setFormData({ ...formData, valid_until: e.target.value })
            }
            className="form-input w-full"
          />
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-semibold shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Wird erstellt...' : '✅ Ankündigung erstellen'}
      </button>
    </form>
  );
}
