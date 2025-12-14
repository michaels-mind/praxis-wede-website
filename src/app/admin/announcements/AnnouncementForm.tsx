'use client';

import { useState } from 'react';
import { createAnnouncement } from '@/lib/admin';

interface AnnouncementFormProps {
  onSuccess: () => void;
}

export function AnnouncementForm({ onSuccess }: AnnouncementFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
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
      await createAnnouncement(formData);
      setFormData({ title: '', description: '', valid_from: '', valid_until: '' });
      onSuccess();
    } catch (error) {
      console.error('Create error:', error);
      alert('Fehler beim Erstellen');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='announcement-form'>
      <div className='form-group'>
        <label htmlFor='title'>Titel *</label>
        <input
          type='text'
          id='title'
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className='form-input'
          required
        />
      </div>

      <div className='form-group'>
        <label htmlFor='description'>Beschreibung *</label>
        <textarea
          id='description'
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className='form-input'
          rows={4}
          required
        />
      </div>

      <div className='form-row'>
        <div className='form-group'>
          <label htmlFor='valid_from'>Gültig von (optional)</label>
          <input
            type='date'
            id='valid_from'
            value={formData.valid_from}
            onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
            className='form-input'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='valid_until'>Gültig bis (optional)</label>
          <input
            type='date'
            id='valid_until'
            value={formData.valid_until}
            onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
            className='form-input'
          />
        </div>
      </div>

      <button 
        type='submit' 
        className='btn-primary'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Wird erstellt...' : '✅ Ankündigung erstellen'}
      </button>
    </form>
  );
}
