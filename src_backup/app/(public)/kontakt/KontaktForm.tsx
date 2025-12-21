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
    const messageError = validateRequired(formData.message);
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-gray-700">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700">E-Mail *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Telefon */}
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-semibold text-gray-700">Telefon (optional)</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
      </div>

      {/* Nachricht */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold text-gray-700">Nachricht *</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-3">
          <span className="text-xl">✅</span>
          <p>Ihre Nachricht wurde erfolgreich übermittelt! Wir melden uns in Kürze.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-3">
          <span className="text-xl">⚠️</span>
          <p>Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut oder rufen Sie uns an.</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Wird gesendet...' : 'Nachricht absenden'}
      </button>
    </form>
  );
}
