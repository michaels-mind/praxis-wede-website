// src/app/kontakt/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import KontaktForm from './KontaktForm';

export const metadata: Metadata = {
  title: 'Kontakt – Praxis Andreas Wede',
  description:
    'Kontakt zur Praxis Dr. Andreas Wede in Nienburg/Weser: Telefonnummern, Adresse, Anfahrt und sicheres Kontaktformular.',
};

export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="home-hero-grid">
        <div className="home-hero-image-col">
          <Image
            src="/images/hero-kontakt-wede.webp"
            alt="Kontaktaufnahme zur Praxis Dr. Wede"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>
        <div className="flex items-center justify-center p-8 md:p-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Kontakt
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Hier finden Sie alle wichtigen Kontaktdaten der Praxis. In akuten
              Notfällen nutzen Sie bitte die Notrufnummern 112 und 116 117.
            </p>
          </div>
        </div>
      </section>

      {/* Kontakt-Infos als Cards */}
      <section className="home-section-cards">
        {/* Telefonnummern */}
        <div className="home-info-card">
          <div className="leistung-card-icon">
            <Image
              src="/icons/icon-phone.svg"
              alt="Telefon"
              width={48}
              height={48}
            />
          </div>
          <h2 className="text-xl font-semibold mb-4">Telefonnummern</h2>
          <p className="text-gray-600 mb-4">
            Für Termine und Rückfragen wenden Sie sich bitte möglichst
            telefonisch an die Praxis.
          </p>
          <ul className="leistung-card-list">
            <li>
              Allgemeine Praxisnummer:{' '}
              <a href="tel:+495021000000" className="home-contact-link">
                +49 (0)5021 000000
              </a>
            </li>
            <li>Weitere Durchwahlen können bei Bedarf ergänzt werden.</li>
          </ul>
        </div>

        {/* Adresse & Anfahrt */}
        <div className="home-info-card">
          <div className="leistung-card-icon">
            <Image
              src="/icons/icon-location.svg"
              alt="Adresse"
              width={48}
              height={48}
            />
          </div>
          <h2 className="text-xl font-semibold mb-4">Adresse und Anfahrt</h2>
          <p className="text-gray-600 mb-4">
            Die Praxis liegt zentral in Nienburg/Weser.
          </p>
          <p className="text-gray-600 mb-4">
            Praxis Andreas Wede
            <br />
            XYZ-Straße 1
            <br />
            31582 Nienburg/Weser
          </p>
          <p className="text-gray-600">
            Hinweise zu Parkplätzen und Haltestellen in der Nähe fügen wir hier
            ein, sobald sie feststehen.
          </p>
        </div>

        {/* Notfälle */}
        <div className="home-info-card">
          <div className="leistung-card-icon">
            <Image
              src="/icons/icon-alert.svg"
              alt="Notfälle"
              width={48}
              height={48}
            />
          </div>
          <h2 className="text-xl font-semibold mb-4">Notfälle</h2>
          <p className="text-gray-600 mb-4">
            In akuten Notfällen zählt jede Minute. Bitte nutzen Sie die
            folgenden Notrufnummern.
          </p>
          <ul className="leistung-card-list">
            <li>
              Lebensbedrohlicher Notfall: <strong>Notruf 112</strong>
            </li>
            <li>
              Ärztlicher Bereitschaftsdienst außerhalb der Sprechzeiten:{' '}
              <strong>116 117</strong>
            </li>
          </ul>
        </div>
      </section>

      {/* Kontaktformular Section */}
      <section className="max-w-5xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Kontaktformular
        </h2>
        <p className="text-gray-600 mb-8">
          Über das Formular können Sie uns für nicht dringende Anliegen eine
          Nachricht schicken. Bitte geben Sie keine sehr sensiblen Daten ein.
        </p>

        <div className="kontakt-form">
          <KontaktForm />
        </div>
      </section>
    </main>
  );
}
