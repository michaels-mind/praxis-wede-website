'use client';

import { useState } from 'react';
import { createContactMessage } from '../lib/queries';
import {
  validateRequired,
  validateEmail,
  validatePhone,
} from '../lib/validation';

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
};

export default function KontaktForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    newErrors.name = validateRequired(form.name);
    newErrors.email = validateRequired(form.email) || validateEmail(form.email);
    newErrors.phone = form.phone ? validatePhone(form.phone) : null;
    newErrors.message = validateRequired(form.message);

    setErrors(newErrors);

    return !Object.values(newErrors).some((val) => val);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await createContactMessage({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        message: form.message,
        status: 'new',
      });
      setSubmitSuccess('Ihre Nachricht wurde erfolgreich übermittelt.');
      setForm({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (error) {
      setSubmitError(
        'Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {submitSuccess && (
        <p className="form-success" role="status">
          {submitSuccess}
        </p>
      )}
      {submitError && (
        <p className="form-error" role="alert">
          {submitError}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-describedby="kontakt-formular-hinweis"
        className="kontakt-form"
      >
        <span id="kontakt-formular-hinweis" className="home-note">
          Mit * gekennzeichnete Felder sind erforderlich.
        </span>

        <div className="form-field">
          <label className="form-label" htmlFor="name">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-input"
            value={form.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            required
          />
          {errors.name && (
            <p id="name-error" className="form-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="email">
            E-Mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            value={form.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            required
          />
          {errors.email && (
            <p id="email-error" className="form-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="phone">
            Telefonnummer (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="form-input"
            value={form.phone}
            onChange={handleChange}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="form-error">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="message">
            Ihre Nachricht *
          </label>
          <textarea
            id="message"
            name="message"
            className="form-input"
            rows={5}
            value={form.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            required
          />
          {errors.message && (
            <p id="message-error" className="form-error">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="admin-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Wird gesendet …' : 'Nachricht senden'}
        </button>
      </form>
    </>
  );
}
