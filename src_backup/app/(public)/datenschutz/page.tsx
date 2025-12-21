import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Datenschutz — Praxis Andreas Wede',
  description:
    'Grundlegende Hinweise zum Datenschutz auf der Website der Praxis Dr. Andreas Wede in Nienburg/Weser.',
};

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-grid">
            <div className="home-hero-image-col">
              <Image
                src="/images/hero-datenschutz-wede.webp"
                alt="Datenschutz Praxis Dr. Wede"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>
            <div className="home-hero-text-col">
              <h1 className="page-title">Datenschutz</h1>
              <p className="text-lg text-gray-600 mb-8">
                Informationen zur Verarbeitung personenbezogener Daten beim Besuch unserer Website.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container max-w-4xl">
          <h2 className="section-title">Verantwortlicher</h2>
          <p className="text-gray-600 mb-8">
            Praxis Andreas Wede
            <br />
            Dr. Andreas Wede
            <br />
            XYZ-Straße 1
            <br />
            31582 Nienburg/Weser
          </p>

          <h2 className="section-title">Datenverarbeitung beim Besuch der Website</h2>
          <p className="text-gray-600 mb-4">
            Beim Aufruf dieser Website werden aus technischen Gründen bestimmte
            Daten automatisch verarbeitet (z. B. IP-Adresse, Datum und Uhrzeit
            des Zugriffs, aufgerufene Seiten). Diese Informationen dienen dem
            stabilen Betrieb der Seite.
          </p>
          <p className="text-gray-600 mb-8">
            Eine darüber hinausgehende Auswertung findet nur in dem Rahmen statt,
            der für den sicheren Betrieb und die Fehleranalyse erforderlich ist.
          </p>

          <h2 className="section-title">Kontaktformular</h2>
          <p className="text-gray-600 mb-4">
            Wenn Sie das Kontaktformular nutzen, verarbeiten wir die von Ihnen
            eingegebenen Angaben ausschließlich zur Bearbeitung Ihrer Anfrage.
          </p>
          <p className="text-gray-600 mb-8">
            Die Übermittlung erfolgt verschlüsselt. Bitte senden Sie über das
            Formular keine sehr sensiblen medizinischen Informationen.
          </p>

          <h2 className="section-title">Ihre Rechte</h2>
          <p className="text-gray-600 mb-4">
            Sie haben im Rahmen der gesetzlichen Vorgaben unter anderem das Recht
            auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung
            Ihrer personenbezogenen Daten.
          </p>
          <p className="text-gray-600 mb-8">
            Wenden Sie sich dazu bitte an die Praxis. Die Kontaktdaten finden Sie
            im Impressum und auf der Kontaktseite.
          </p>
        </div>
      </section>
    </main>
  );
}
