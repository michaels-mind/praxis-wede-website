'use client';

import { useState } from 'react';
import { createVacation } from '@/lib/admin';

interface VacationFormProps {
  onSuccess: () => void;
}

export function VacationForm({ onSuccess }: VacationFormProps) {
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.start_date || !formData.end_date || !formData.description) {
      alert('Alle Felder sind erforderlich');
      return;
    }

    if (new Date(formData.start_date) > new Date(formData.end_date)) {
      alert('Enddatum muss nach Startdatum liegen');
      return;
    }

    setIsSubmitting(true);
    try {
      await createVacation(formData);
      setFormData({ start_date: '', end_date: '', description: '' });
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="start_date" className="form-label">
            Startdatum *
          </label>
          <input
            type="date"
            id="start_date"
            value={formData.start_date}
            onChange={(e) =>
              setFormData({ ...formData, start_date: e.target.value })
            }
            className="form-input w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="end_date" className="form-label">
            Enddatum *
          </label>
          <input
            type="date"
            id="end_date"
            value={formData.end_date}
            onChange={(e) =>
              setFormData({ ...formData, end_date: e.target.value })
            }
            className="form-input w-full"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="form-label">
          Grund *
        </label>
        <input
          type="text"
          id="description"
          value={formData.description}
          placeholder="z.B. Weihnachtsferien, Betriebsurlaub"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="form-input w-full"
          required
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-semibold shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Wird erstellt...' : '✅ Urlaub hinzufügen'}
      </button>
    </form>
  );
}
