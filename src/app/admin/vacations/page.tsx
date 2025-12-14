'use client';

import { useState } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { VacationsList } from './VacationsList';
import { VacationForm } from './VacationForm';

export default function VacationsPage() {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setShowForm(false);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <AdminLayout>
      <div className='page-header'>
        <h1 className='page-title'>Urlaube & Schließungen</h1>
        <button 
          className='btn-primary'
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '❌ Abbrechen' : '➕ Neuer Urlaub'}
        </button>
      </div>

      <div className='info-box'>
        <p>🏖️ Verwalten Sie Urlaube und Schließzeiten. Diese werden automatisch auf der Website angezeigt.</p>
      </div>

      {showForm && (
        <div className='form-container'>
          <h2 className='section-title'>Neuen Urlaub anlegen</h2>
          <VacationForm onSuccess={handleSuccess} />
        </div>
      )}

      <div key={refreshKey}>
        <VacationsList />
      </div>
    </AdminLayout>
  );
}
