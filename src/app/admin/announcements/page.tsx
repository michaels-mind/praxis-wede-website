'use client';

import { useState } from 'react';
import { AnnouncementsList } from './AnnouncementsList';
import { AnnouncementForm } from './AnnouncementForm';

export default function AnnouncementsPage() {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setShowForm(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      {/* Header */}
      <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 bg-clip-text text-transparent mb-2">
            Ankündigungen verwalten
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-xl">
            Erstellen und verwalten Sie Ankündigungen, die auf der öffentlichen
            Website im Hinweisbereich angezeigt werden.
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? '❌ Abbrechen' : '➕ Neue Ankündigung'}
        </button>
      </header>

      {/* Info-Box */}
      <section className="mb-8">
        <div className="alert-info">
          <p>
            💡 Nutzen Sie Ankündigungen zum Beispiel für Hinweise auf
            geänderte Sprechzeiten, besondere Aktionen oder organisatorische Informationen.
          </p>
        </div>
      </section>

      {/* Formular */}
      {showForm && (
        <section className="mb-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Neue Ankündigung erstellen
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Titel und Beschreibung sind Pflichtfelder. Optional können Sie
              einen Gültigkeitszeitraum hinterlegen.
            </p>
            <AnnouncementForm onSuccess={handleSuccess} />
          </div>
        </section>
      )}

      {/* Liste */}
      <section key={refreshKey}>
        <AnnouncementsList />
      </section>
    </>
  );
}
