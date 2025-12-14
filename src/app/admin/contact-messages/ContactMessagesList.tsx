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

  const handleStatusChange = async (id: string, status: 'new' | 'read' | 'answered' | 'archived') => {
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
      new: { label: 'Neu', color: '#2563eb', bg: '#dbeafe' },
      read: { label: 'Gelesen', color: '#059669', bg: '#d1fae5' },
      answered: { label: 'Beantwortet', color: '#10b981', bg: '#d1fae5' },
      archived: { label: 'Archiviert', color: '#6b7280', bg: '#f3f4f6' },
    };
    const badge = badges[status as keyof typeof badges] || badges.new;
    
    return (
      <span 
        className='status-badge'
        style={{ color: badge.color, backgroundColor: badge.bg }}
      >
        {badge.label}
      </span>
    );
  };

  if (loading) {
    return <div className='loading-spinner'>Lädt...</div>;
  }

  return (
    <div className='messages-container'>
      <div className='messages-filters'>
        <button 
          className={filter === '' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('')}
        >
          📬 Alle ({messages.length})
        </button>
        <button 
          className={filter === 'new' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('new')}
        >
          🆕 Neu
        </button>
        <button 
          className={filter === 'read' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('read')}
        >
          👁️ Gelesen
        </button>
        <button 
          className={filter === 'answered' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('answered')}
        >
          ✅ Beantwortet
        </button>
        <button 
          className={filter === 'archived' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('archived')}
        >
          📦 Archiviert
        </button>
      </div>

      {messages.length === 0 ? (
        <p className='empty-state'>Keine Nachrichten gefunden</p>
      ) : (
        <div className='messages-list'>
          {messages.map((msg) => (
            <div key={msg.id} className={`message-card ${msg.status === 'new' ? 'unread' : ''}`}>
              <div className='message-header'>
                <div className='message-sender'>
                  <h3>{msg.name}</h3>
                  {getStatusBadge(msg.status)}
                </div>
                <div className='message-date'>
                  {new Date(msg.created_at).toLocaleString('de-DE')}
                </div>
              </div>

              <div className='message-contact'>
                <span>📧 {msg.email}</span>
                {msg.phone && <span>📞 {msg.phone}</span>}
              </div>

              <div className='message-body'>
                <p>{msg.message}</p>
              </div>

              <div className='message-actions'>
                {msg.status === 'new' && (
                  <button 
                    className='btn-action btn-read'
                    onClick={() => handleStatusChange(msg.id, 'read')}
                  >
                    👁️ Als gelesen markieren
                  </button>
                )}
                {(msg.status === 'new' || msg.status === 'read') && (
                  <button 
                    className='btn-action btn-answered'
                    onClick={() => handleStatusChange(msg.id, 'answered')}
                  >
                    ✅ Als beantwortet markieren
                  </button>
                )}
                {msg.status !== 'archived' && (
                  <button 
                    className='btn-action btn-archive'
                    onClick={() => handleStatusChange(msg.id, 'archived')}
                  >
                    📦 Archivieren
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
