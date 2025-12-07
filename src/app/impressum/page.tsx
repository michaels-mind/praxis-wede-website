// src/app/impressum/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Impressum – Praxis Andreas Wede',
  description:
    'Impressum der Praxis Dr. Andreas Wede in Nienburg/Weser mit Angaben nach § 5 TMG und berufsrechtlichen Informationen.',
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="home-hero-grid">
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
        <div className="flex items-center justify-center p-8 md:p-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Impressum
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Angaben nach § 5 Telemediengesetz (TMG) und berufsrechtlichen Vorgaben.
            </p>
          </div>
        </div>
      </section>

      {/* Impressum Inhalte */}
      <section className="max-w-6xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Verantwortlich für den Inhalt
        </h2>
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
          E-Mail: [info@praxis-wede.de](mailto:info@praxis-wede.de)
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Berufsbezeichnung und zuständige Stellen
        </h2>
        <p className="text-gray-600 mb-6">
          Die genauen Angaben zu Kammer, Berufsordnung und zuständiger Aufsicht
          ergänzen wir hier nach den Vorgaben der Ärztekammer.
        </p>
        <div className="admin-list">
          <div className="admin-list-item">
            <span>Berufsbezeichnung: Arzt, Facharzt für Allgemeinmedizin</span>
          </div>
          <div className="admin-list-item">
            <span>Berufsrechtliche Regelungen: werden ergänzt</span>
          </div>
          <div className="admin-list-item">
            <span>Zuständige Ärztekammer: wird ergänzt</span>
          </div>
          <div className="admin-list-item">
            <span>Zuständige Kassenärztliche Vereinigung: wird ergänzt</span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Haftungsausschluss
        </h2>
        <p className="text-gray-600 mb-4">
          Diese Website dient der Information über die Praxis und ersetzt keine
          persönliche ärztliche Beratung, Untersuchung oder Behandlung.
        </p>
        <p className="text-gray-600">
          Für Inhalte externer Links übernehmen wir trotz sorgfältiger
          Kontrolle keine Haftung. Für den Inhalt der verlinkten Seiten sind
          ausschließlich deren Betreiber verantwortlich.
        </p>
      </section>
    </main>
  );
}
