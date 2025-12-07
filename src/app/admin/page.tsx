// src/app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';

const ADMIN_PASSWORD = 'GreenHealth2025';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined'
      ? window.localStorage.getItem('praxis-wede-admin')
      : null;
    if (stored === 'logged-in') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === ADMIN_PASSWORD) {
      window.localStorage.setItem('praxis-wede-admin', 'logged-in');
      setIsLoggedIn(true);
      setError(null);
      setPassword('');
    } else {
      setError('Das eingegebene Passwort ist nicht korrekt.');
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <header className="page-header">
          <h1 id="admin-heading" className="page-title">
            Admin-Bereich
          </h1>
          <p className="page-intro">
            Dieser Bereich ist ausschließlich für Mitarbeitende der Praxis
            bestimmt. Bitte geben Sie das Admin-Passwort ein.
          </p>
        </header>

        <section className="home-section" aria-label="Admin-Login">
          <form onSubmit={handleSubmit} className="admin-login-form">
            <label className="form-label" htmlFor="admin-password">
              Passwort
            </label>
            <input
              id="admin-password"
              type="password"
              className="form-input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="admin-button">
              Anmelden
            </button>
          </form>
        </section>
      </>
    );
  }

  return (
    <>
      <header className="page-header">
        <h1 id="admin-heading" className="page-title">
          Admin-Dashboard
        </h1>
        <p className="page-intro">
          Verwalten Sie hier Öffnungszeiten, Urlaube, Hinweise und
          Kontaktanfragen der Praxis.
        </p>
      </header>

      <section className="home-section" aria-label="Admin-Navigation">
        <ul className="leistung-list">
          <li>
            <a href="/admin/opening-hours" className="home-contact-link">
              Öffnungszeiten bearbeiten
            </a>
          </li>
          <li>
            <a href="/admin/vacations" className="home-contact-link">
              Urlaube und Vertretungen verwalten
            </a>
          </li>
          <li>
            <a href="/admin/announcements" className="home-contact-link">
              Hinweise veröffentlichen
            </a>
          </li>
          <li>
            <a href="/admin/contact-messages" className="home-contact-link">
              Kontaktanfragen einsehen
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
