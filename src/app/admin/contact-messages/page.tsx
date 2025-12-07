// src/app/admin/contact-messages/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getContactMessages, deleteContactMessage } from '../../lib/queries';
import type { ContactMessage } from '../../lib/types';

export default function AdminContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const loadMessages = async () => {
    try {
      const data = await getContactMessages();
      setMessages(data);
      setLoadError(null);
    } catch (error) {
      setLoadError('Die Kontaktanfragen konnten nicht geladen werden.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      'Möchten Sie diese Kontaktanfrage wirklich löschen?',
    );
    if (!confirmDelete) return;

    try {
      await deleteContactMessage(id);
      setActionError(null);
      loadMessages();
    } catch (error) {
      setActionError('Die Kontaktanfrage konnte nicht gelöscht werden.');
    }
  };

  return (
    <>
      <header className="page-header">
        <h1 id="admin-contact-messages-heading" className="page-title">
          Kontaktanfragen
        </h1>
        <p className="page-intro">
          Hier sehen Sie Kontaktanfragen, die über das Formular eingegangen
          sind. Die detaillierte Statusverwaltung ergänzen wir später.
        </p>
      </header>

      <section
        aria-labelledby="admin-contact-messages-heading"
        className="home-section"
      >
        {isLoading && <p>Kontaktanfragen werden geladen …</p>}
        {loadError && <p className="form-error">{loadError}</p>}
        {actionError && <p className="form-error">{actionError}</p>}

        {!isLoading && !loadError && messages.length === 0 && (
          <p>Derzeit liegen keine Kontaktanfragen vor.</p>
        )}

        {!isLoading && !loadError && messages.length > 0 && (
          <ul className="admin-list">
            {messages.map((msg) => (
              <li key={msg.id} className="admin-list-item">
                <div className="admin-list-header">
                  <div>
                    <h2 className="admin-list-title">
                      {msg.name || 'Unbekannt'}
                    </h2>
                    <p className="admin-list-text">
                      {msg.email && (
                        <>
                          E-Mail: <a href={`mailto:${msg.email}`}>{msg.email}</a>
                        </>
                      )}
                      {msg.phone && (
                        <>
                          {msg.email ? ' · ' : ''}
                          Telefon:{' '}
                          <a href={`tel:${msg.phone}`}>{msg.phone}</a>
                        </>
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="admin-button"
                    onClick={() => handleDelete(msg.id)}
                  >
                    Löschen
                  </button>
                </div>
                <p className="admin-list-text">{msg.message}</p>
                <p className="admin-list-text">
                  Status: {msg.status || 'unbekannt'}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
