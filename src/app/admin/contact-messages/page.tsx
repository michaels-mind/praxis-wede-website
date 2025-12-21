import { ContactMessagesList } from './ContactMessagesList';

export default function ContactMessagesPage() {
  return (
    <>
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 bg-clip-text text-transparent mb-2">
          Kontaktnachrichten
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-xl">
          Eingehende Anfragen aus dem Kontaktformular. Bearbeiten Sie den
          Status, um den Bearbeitungsstand für das Praxisteam transparent zu halten.
        </p>
      </header>

      {/* Info-Box */}
      <section className="mb-8">
        <div className="alert-info">
          <p>
            💡 <strong>Workflow:</strong> Neue Nachricht → Gelesen → Beantwortet → Archiviert.
          </p>
        </div>
      </section>

      {/* Nachrichtenliste */}
      <section>
        <ContactMessagesList />
      </section>
    </>
  );
}
