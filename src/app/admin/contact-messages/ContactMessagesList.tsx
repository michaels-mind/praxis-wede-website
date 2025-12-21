'use client';

import { useState, useEffect } from 'react';
import { getContactMessages, updateContactMessageStatus } from '@/lib/admin';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'answered' | 'archived';
  created_at: string;
  replied_at?: string;
}

export function ContactMessagesList() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    loadMessages();
  }, [filter]);

  const loadMessages = async () => {
    setLoading(true);
    const data = await getContactMessages(filter || undefined);
    setMessages(data || []);
    setLoading(false);
  };

  const handleStatusChange = async (
    id: string,
    status: 'new' | 'read' | 'answered' | 'archived',
  ) => {
    try {
      await updateContactMessageStatus(id, status);
      await loadMessages();
    } catch (error) {
      console.error('Status update error:', error);
      alert('Fehler beim Status-Update');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      new: {
        label: 'Neu',
        classes: 'bg-blue-50 text-blue-700',
      },
      read: {
        label: 'Gelesen',
        classes: 'bg-emerald-50 text-emerald-700',
      },
      answered: {
        label: 'Beantwortet',
        classes: 'bg-green-50 text-green-700',
      },
      archived: {
        label: 'Archiviert',
        classes: 'bg-gray-100 text-gray-600',
      },
    };
    const badge = badges[status as keyof typeof badges] || badges.new;

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${badge.classes}`}
      >
        {badge.label}
      </span>
    );
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Lädt...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filter-Leiste */}
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            filter === ''
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setFilter('')}
        >
          📬 Alle ({messages.length})
        </button>
        <button
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            filter === 'new'
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setFilter('new')}
        >
          🆕 Neu
        </button>
        <button
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            filter === 'read'
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setFilter('read')}
        >
          👁️ Gelesen
        </button>
        <button
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            filter === 'answered'
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setFilter('answered')}
        >
          ✅ Beantwortet
        </button>
        <button
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            filter === 'archived'
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
          onClick={() => setFilter('archived')}
        >
          📦 Archiviert
        </button>
      </div>

      {/* Liste / Empty State */}
      {messages.length === 0 ? (
        <p className="text-sm text-gray-500 italic">
          Keine Nachrichten gefunden.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {messages.map((msg) => (
            <article
              key={msg.id}
              className={`card relative border border-gray-100 bg-white/90 backdrop-blur-sm ${
                msg.status === 'new' ? 'ring-2 ring-blue-100' : ''
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {msg.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 items-center text-xs text-gray-600">
                    <span>📧 {msg.email}</span>
                    {msg.phone && <span>· 📞 {msg.phone}</span>}
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-xs text-gray-500">
                    {new Date(msg.created_at).toLocaleString('de-DE')}
                  </div>
                  {getStatusBadge(msg.status)}
                </div>
              </div>

              {/* Nachricht */}
              <div className="mb-4">
                <p className="text-sm text-gray-800 whitespace-pre-line">
                  {msg.message}
                </p>
              </div>

              {/* Aktionen */}
              <div className="flex flex-wrap gap-2">
                {msg.status === 'new' && (
                  <button
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                    onClick={() => handleStatusChange(msg.id, 'read')}
                  >
                    👁️ Als gelesen markieren
                  </button>
                )}
                {(msg.status === 'new' || msg.status === 'read') && (
                  <button
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                    onClick={() => handleStatusChange(msg.id, 'answered')}
                  >
                    ✅ Als beantwortet markieren
                  </button>
                )}
                {msg.status !== 'archived' && (
                  <button
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    onClick={() => handleStatusChange(msg.id, 'archived')}
                  >
                    📦 Archivieren
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
