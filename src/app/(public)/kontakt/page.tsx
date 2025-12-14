import type { Metadata } from 'next';
import Image from 'next/image';
import KontaktForm from './KontaktForm';

export const metadata: Metadata = {
  title: 'Kontakt — Praxis Andreas Wede',
  description:
    'Kontakt zur Praxis Dr. Andreas Wede in Nienburg/Weser: Telefonnummern, Adresse, Anfahrt und sicheres Kontaktformular.',
};

export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-grid">
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
            <div className="home-hero-text-col">
              <h1 className="page-title">Kontakt</h1>
              <p className="text-lg text-gray-600 mb-8">
                Hier finden Sie alle wichtigen Kontaktdaten der Praxis. In akuten
                Notfällen nutzen Sie bitte die Notrufnummern 112 und 116 117.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="home-section-cards">
            <div className="home-info-card">
              <div className="home-info-card-icon">
                <Image
                  src="/icons/icon-phone.svg"
                  alt="Telefon"
                  width={36}
                  height={36}
                />
              </div>
              <h2 className="home-info-card-title">Telefonnummern</h2>
              <p className="home-info-card-text">
                Für Termine und Rückfragen wenden Sie sich bitte möglichst
                telefonisch an die Praxis.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>
                  Allgemeine Praxisnummer:{' '}
                  <a href="tel:+495021000000" className="home-contact-link">
                    +49 (0)5021 000000
                  </a>
                </li>
                <li>Weitere Durchwahlen können bei Bedarf ergänzt werden.</li>
              </ul>
            </div>

            <div className="home-info-card">
              <div className="home-info-card-icon">
                <Image
                  src="/icons/icon-location.svg"
                  alt="Adresse"
                  width={36}
                  height={36}
                />
              </div>
              <h2 className="home-info-card-title">Adresse und Anfahrt</h2>
              <p className="home-info-card-text">
                Die Praxis liegt zentral in Nienburg/Weser.
              </p>
              <p className="home-info-card-text mt-4">
                Praxis Andreas Wede
                <br />
                XYZ-Straße 1
                <br />
                31582 Nienburg/Weser
              </p>
              <p className="home-info-card-text mt-4">
                Hinweise zu Parkplätzen und Haltestellen in der Nähe fügen wir hier
                ein, sobald sie feststehen.
              </p>
            </div>

            <div className="home-info-card">
              <div className="home-info-card-icon">
                <Image
                  src="/icons/icon-alert.svg"
                  alt="Notfälle"
                  width={36}
                  height={36}
                />
              </div>
              <h2 className="home-info-card-title">Notfälle</h2>
              <p className="home-info-card-text">
                In akuten Notfällen zählt jede Minute. Bitte nutzen Sie die
                folgenden Notrufnummern.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>
                  Lebensbedrohlicher Notfall: <strong>Notruf 112</strong>
                </li>
                <li>
                  Ärztlicher Bereitschaftsdienst außerhalb der Sprechzeiten:{' '}
                  <strong>116 117</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section bg-gray-50">
        <div className="container">
          <h2 className="section-title">Kontaktformular</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Über das Formular können Sie uns für nicht dringende Anliegen eine
            Nachricht schicken. Bitte geben Sie keine sehr sensiblen Daten ein.
          </p>
          <div className="max-w-3xl">
            <KontaktForm />
          </div>
        </div>
      </section>
    </main>
  );
}
