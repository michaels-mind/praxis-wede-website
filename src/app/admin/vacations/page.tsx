'use client';

import { useState } from 'react';
import { VacationsList } from './VacationsList';
import { VacationForm } from './VacationForm';

export default function VacationsPage() {
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
            Urlaube &amp; Schließungen
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-xl">
            Verwalten Sie Praxisurlaube und Schließzeiten. Diese Informationen
            werden automatisch im öffentlichen Bereich der Website angezeigt.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? (
            <>
              ❌ <span>Abbrechen</span>
            </>
          ) : (
            <>
              ➕ <span>Neuer Urlaub</span>
            </>
          )}
        </button>
      </header>

      {/* Info-Hinweis */}
      <section className="mb-8">
        <div className="alert-info">
          <p>
            <strong>Hinweis:</strong> Urlaube werden zeitlich sortiert
            angezeigt. Bestehende Einträge können jederzeit wieder gelöscht
            werden.
          </p>
        </div>
      </section>

      {/* Formular */}
      {showForm && (
        <section className="mb-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Neuen Urlaub anlegen
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Füllen Sie die folgenden Felder aus. Die Angaben erscheinen
              automatisch auf der Website, sobald der Zeitraum erreicht ist.
            </p>
            <VacationForm onSuccess={handleSuccess} />
          </div>
        </section>
      )}

      {/* Liste */}
      <section key={refreshKey}>
        <VacationsList />
      </section>
    </>
  );
}
