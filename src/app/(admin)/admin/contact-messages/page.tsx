// src/app/admin/contact-messages/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getContactMessages, markMessageAsRead } from '../../../lib/admin';

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
  archived_at: string | null;
};

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

  const handleMarkAsRead = async (id: string) => {
    try {
      await markMessageAsRead(id);
      setActionError(null);
      loadMessages();
    } catch (error) {
      setActionError('Fehler beim Aktualisieren der Nachricht.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Kontaktanfragen</h1>
      </div>

      {isLoading && (
        <div className="text-center py-12">Kontaktanfragen werden geladen …</div>
      )}
      
      {loadError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {loadError}
        </div>
      )}
      
      {actionError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {actionError}
        </div>
      )}

      {!isLoading && !loadError && messages.length === 0 && (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          Derzeit liegen keine Kontaktanfragen vor.
        </div>
      )}

      {!isLoading && !loadError && messages.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {messages.map((msg) => (
              <div key={msg.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {msg.name || 'Unbekannt'}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          msg.is_read
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {msg.is_read ? 'Gelesen' : 'Neu'}
                      </span>
                    </div>
                    
                    <p className="mt-2 text-sm text-gray-600">
                      {msg.email && (
                        <>
                          E-Mail: <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline">{msg.email}</a>
                        </>
                      )}
                      {msg.phone && (
                        <>
                          {msg.email ? ' · ' : ''}
                          Telefon: <a href={`tel:${msg.phone}`} className="text-blue-600 hover:underline">{msg.phone}</a>
                        </>
                      )}
                    </p>
                    
                    <p className="mt-3 text-gray-800">{msg.message}</p>
                    
                    <p className="mt-2 text-xs text-gray-500">
                      Eingegangen: {new Date(msg.created_at).toLocaleString('de-DE')}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    {!msg.is_read && (
                      <button
                        onClick={() => handleMarkAsRead(msg.id)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      >
                        Als gelesen markieren
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
