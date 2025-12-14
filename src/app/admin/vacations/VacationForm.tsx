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
    reason: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.start_date || !formData.end_date || !formData.reason) {
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
      setFormData({ start_date: '', end_date: '', reason: '' });
      onSuccess();
    } catch (error) {
      console.error('Create error:', error);
      alert('Fehler beim Erstellen');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='vacation-form'>
      <div className='form-row'>
        <div className='form-group'>
          <label htmlFor='start_date'>Startdatum *</label>
          <input
            type='date'
            id='start_date'
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            className='form-input'
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='end_date'>Enddatum *</label>
          <input
            type='date'
            id='end_date'
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            className='form-input'
            required
          />
        </div>
      </div>

      <div className='form-group'>
        <label htmlFor='reason'>Grund *</label>
        <input
          type='text'
          id='reason'
          value={formData.reason}
          placeholder='z.B. Weihnachtsferien, Betriebsurlaub'
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          className='form-input'
          required
        />
      </div>

      <button 
        type='submit' 
        className='btn-primary'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Wird erstellt...' : '✅ Urlaub hinzufügen'}
      </button>
    </form>
  );
}
