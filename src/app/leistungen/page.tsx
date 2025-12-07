// src/app/leistungen/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Leistungen – Praxis Andreas Wede',
  description:
    'Übersicht über die hausärztlichen Leistungen von Dr. Andreas Wede in Nienburg/Weser: Allgemeinmedizin, Suchtmedizinische Grundversorgung, Palliativmedizin und mehr.',
};

export default function LeistungenPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="home-hero-grid">
        <div className="home-hero-image-col">
          <Image
            src="/images/hero-leistungen-wede.webp"
            alt="Medizinische Leistungen Dr. Wede"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>
        <div className="flex items-center justify-center p-8 md:p-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Unsere Leistungen
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Umfassende hausärztliche Versorgung für Erwachsene und Kinder in Nienburg.
            </p>
          </div>
        </div>
      </section>

      {/* Leistungen Cards */}
      <section className="home-section-cards">
        <div className="home-info-card">
          <div className="leistung-card-icon">
            <Image
              src="/icons/icon-stethoscope.svg"
              alt="Allgemeinmedizin"
              width={48}
              height={48}
            />
          </div>
          <h3 className="text-xl font-semibold mb-4">Allgemeinmedizin</h3>
          <p className="text-gray-600 mb-4">
            Vom Vorsorgegespräch bis zur Behandlung akuter Erkrankungen – wir begleiten Sie durch alle Lebensphasen.
          </p>
          <ul className="leistung-card-list">
            <li>Vorsorge- und Check-up-Untersuchungen</li>
            <li>Behandlung akuter und chronischer Erkrankungen</li>
            <li>Impfberatung und Durchführung</li>
            <li>Hausärztliche Versorgung von Erwachsenen und Kindern</li>
          </ul>
        </div>

        <div className="home-info-card">
          <div className="leistung-card-icon">
            <Image
              src="/icons/icon-addiction.svg"
              alt="Suchtmedizin"
              width={48}
              height={48}
            />
          </div>
          <h3 className="text-xl font-semibold mb-4">Suchtmedizinische Grundversorgung</h3>
          <p className="text-gray-600 mb-4">
            Vertrauliche Beratung und Behandlung bei Suchterkrankungen in Zusammenarbeit mit Fachstellen.
          </p>
          <ul className="leistung-card-list">
            <li>Substitutionsbehandlung</li>
            <li>Vertrauliche Suchtberatung</li>
            <li>Entzugsbehandlung und Krisenintervention</li>
            <li>Langzeitbetreuung und Verlaufskontrolle</li>
          </ul>
        </div>

        <div className="home-info-card">
          <div className="leistung-card-icon">
            <Image
              src="/icons/icon-palliative.svg"
              alt="Palliativmedizin"
              width={48}
              height={48}
            />
          </div>
          <h3 className="text-xl font-semibold mb-4">Palliativmedizinische Betreuung</h3>
          <p className="text-gray-600 mb-4">
            Menschliche Begleitung und Behandlung von Patienten mit unheilbaren Erkrankungen.
          </p>
          <ul className="leistung-card-list">
            <li>Schmerztherapie und Symptomlinderung</li>
            <li>Palliativmedizinische Hauskrankenpflege</li>
            <li>Zusammenarbeit mit Hospizdiensten</li>
            <li>Unterstützung für Angehörige</li>
          </ul>
        </div>
      </section>

      {/* Zusätzliche Leistungen */}
      <section className="max-w-6xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Weitere Leistungen
        </h2>
        <div className="admin-list">
          <div className="admin-list-item">
            <span>Diagnostik: Labor, EKG, Lungentest, Blutdrucklangzeitmessung</span>
          </div>
          <div className="admin-list-item">
            <span>Schwerpunkt: Diabetes, Herz-Kreislauf-Erkrankungen, Asthma/COPD</span>
          </div>
          <div className="admin-list-item">
            <span>Reisemedizinische Beratung und Impfungen</span>
          </div>
          <div className="admin-list-item">
            <span>Verletzungsversorgung und Wundmanagement</span>
          </div>
        </div>
      </section>
    </main>
  );
}
