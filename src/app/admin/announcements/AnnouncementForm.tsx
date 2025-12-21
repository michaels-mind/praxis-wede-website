'use client';

import { useState } from 'react';
import { createAnnouncement } from '@/lib/admin';

interface AnnouncementFormProps {
  onSuccess: () => void;
}

export function AnnouncementForm({ onSuccess }: AnnouncementFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    start_date: '',
    end_date: '',
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
      await createAnnouncement(formData);
      setFormData({
        title: '',
        content: '',
        start_date: '',
        end_date: '',
      });
      onSuccess();
    } catch (error) {
      console.error('Create error:', error);
      alert('Fehler beim Erstellen');
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
        <label htmlFor="content" className="form-label">
          Beschreibung *
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
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="start_date" className="form-label">
            Gültig von (optional)
          </label>
          <input
            type="date"
            id="start_date"
            value={formData.start_date}
            onChange={(e) =>
              setFormData({ ...formData, start_date: e.target.value })
            }
            className="form-input w-full"
          />
        </div>

        <div>
          <label htmlFor="end_date" className="form-label">
            Gültig bis (optional)
          </label>
          <input
            type="date"
            id="end_date"
            value={formData.end_date}
            onChange={(e) =>
              setFormData({ ...formData, end_date: e.target.value })
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
