'use client';

import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { AnnouncementsList } from './AnnouncementsList';
import { AnnouncementForm } from './AnnouncementForm';

export default function AnnouncementsPage() {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setShowForm(false);
    setRefreshKey(prev => prev + 1); // Trigger reload
  };

  return (
    <AdminLayout>
      <div className='page-header'>
        <h1 className='page-title'>Ankündigungen verwalten</h1>
        <button 
          className='btn-primary'
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '❌ Abbrechen' : '➕ Neue Ankündigung'}
        </button>
      </div>

      {showForm && (
        <div className='form-container'>
          <h2 className='section-title'>Neue Ankündigung erstellen</h2>
          <AnnouncementForm onSuccess={handleSuccess} />
        </div>
      )}

      <div key={refreshKey}>
        <AnnouncementsList />
      </div>
    </AdminLayout>
  );
}
