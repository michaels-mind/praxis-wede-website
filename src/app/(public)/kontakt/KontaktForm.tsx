'use client';

import { useState } from 'react';
import { createContactMessage } from '@/lib/db/queries';
import {
  validateRequired,
  validateEmail,
  validatePhone,
} from '@/lib/utils/validation';

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export default function KontaktForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const nameError = validateRequired(formData.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    if (formData.phone) {
      const phoneError = validatePhone(formData.phone);
      if (phoneError) newErrors.phone = phoneError;
    }

    const messageError = validateRequired(formData.message, 'Nachricht');
    if (messageError) newErrors.message = messageError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await createContactMessage(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='kontakt-form'>
      <div className='form-group'>
        <label htmlFor='name'>Name *</label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'form-input error' : 'form-input'}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span id='name-error' className='form-error' role='alert'>
            {errors.name}
          </span>
        )}
      </div>

      <div className='form-group'>
        <label htmlFor='email'>E-Mail *</label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'form-input error' : 'form-input'}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id='email-error' className='form-error' role='alert'>
            {errors.email}
          </span>
        )}
      </div>

      <div className='form-group'>
        <label htmlFor='phone'>Telefon (optional)</label>
        <input
          type='tel'
          id='phone'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? 'form-input error' : 'form-input'}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <span id='phone-error' className='form-error' role='alert'>
            {errors.phone}
          </span>
        )}
      </div>

      <div className='form-group'>
        <label htmlFor='message'>Nachricht *</label>
        <textarea
          id='message'
          name='message'
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={errors.message ? 'form-input error' : 'form-input'}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span id='message-error' className='form-error' role='alert'>
            {errors.message}
          </span>
        )}
      </div>

      {submitStatus === 'success' && (
        <div className='form-success' role='status'>
          Ihre Nachricht wurde erfolgreich übermittelt!
        </div>
      )}

      {submitStatus === 'error' && (
        <div className='form-error' role='alert'>
          Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.
        </div>
      )}

      <button
        type='submit'
        className='form-button'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
      </button>
    </form>
  );
}
