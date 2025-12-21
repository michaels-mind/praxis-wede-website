import { OpeningHoursList } from './OpeningHoursList';

export default function OpeningHoursPage() {
  return (
    <>
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 bg-clip-text text-transparent mb-2">
          Öffnungszeiten verwalten
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-xl">
          Bearbeiten Sie die Öffnungszeiten für jeden Wochentag. Änderungen
          werden automatisch im öffentlichen Bereich der Website angezeigt.
        </p>
      </header>

      {/* Info-Box */}
      <section className="mb-8">
        <div className="alert-info">
          <p>
            💡 Passen Sie bei Bedarf einzelne Tage an. Geschlossene Tage
            werden auf der Website entsprechend markiert.
          </p>
        </div>
      </section>

      {/* Tabelle */}
      <section>
        <OpeningHoursList />
      </section>
    </>
  );
}
