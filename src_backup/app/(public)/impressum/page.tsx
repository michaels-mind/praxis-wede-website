import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Impressum — Praxis Andreas Wede',
  description:
    'Impressum der Praxis Dr. Andreas Wede in Nienburg/Weser mit Angaben nach § 5 TMG und berufsrechtlichen Informationen.',
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-grid">
            <div className="home-hero-image-col">
              <Image
                src="/images/hero-impressum-wede.webp"
                alt="Impressum Praxis Dr. Wede"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>
            <div className="home-hero-text-col">
              <h1 className="page-title">Impressum</h1>
              <p className="text-lg text-gray-600 mb-8">
                Angaben nach § 5 Telemediengesetz (TMG) und berufsrechtlichen Vorgaben.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container max-w-4xl">
          <h2 className="section-title">Verantwortlich für den Inhalt</h2>
          <p className="text-gray-600 mb-4">
            Praxis Andreas Wede
            <br />
            Dr. Andreas Wede
            <br />
            XYZ-Straße 1
            <br />
            31582 Nienburg/Weser
          </p>
          <p className="text-gray-600 mb-8">
            Telefon: +49 (0)5021 000000
            <br />
            E-Mail:{' '}
            <a href="mailto:info@praxis-wede.de" className="home-contact-link">
              info@praxis-wede.de
            </a>
          </p>

          <h2 className="section-title">Berufsbezeichnung und zuständige Stellen</h2>
          <p className="text-gray-600 mb-6">
            Die genauen Angaben zu Kammer, Berufsordnung und zuständiger Aufsicht
            ergänzen wir hier nach den Vorgaben der Ärztekammer.
          </p>
          <div className="grid gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <span className="text-gray-700">
                Berufsbezeichnung: Arzt, Facharzt für Allgemeinmedizin
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <span className="text-gray-700">
                Berufsrechtliche Regelungen: werden ergänzt
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <span className="text-gray-700">Zuständige Ärztekammer: wird ergänzt</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <span className="text-gray-700">
                Zuständige Kassenärztliche Vereinigung: wird ergänzt
              </span>
            </div>
          </div>

          <h2 className="section-title">Haftungsausschluss</h2>
          <p className="text-gray-600 mb-4">
            Diese Website dient der Information über die Praxis und ersetzt keine
            persönliche ärztliche Beratung, Untersuchung oder Behandlung.
          </p>
          <p className="text-gray-600 mb-8">
            Für Inhalte externer Links übernehmen wir trotz sorgfältiger Kontrolle keine
            Haftung. Für den Inhalt der verlinkten Seiten sind ausschließlich deren
            Betreiber verantwortlich.
          </p>
        </div>
      </section>
    </main>
  );
}
