'use client';

import { useState } from 'react';

interface AnnouncementFormProps {
  onSuccess: () => void;
}

export function AnnouncementForm({ onSuccess }: AnnouncementFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '', // 🎯 KORREKTUR: content (passend zur DB)
    valid_from: '',
    valid_until: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      alert('Titel und Beschreibung sind erforderlich');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content, // 🎯 DB erwartet "content"
          start_date: formData.valid_from || new Date().toISOString(), // DB erwartet start_date
          end_date: formData.valid_until || new Date().toISOString(),   // DB erwartet end_date
          is_active: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Speichern');
      }

      setFormData({
        title: '',
        content: '',
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
          placeholder="z.B. Grippeschutzimpfung verfügbar"
        />
      </div>

      <div>
        <label htmlFor="content" className="form-label">
          Inhalt *
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          className="form-input w-full min-h-[120px]"
          rows={4}
          required
          placeholder="Geben Sie hier die Details der Ankündigung ein..."
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
