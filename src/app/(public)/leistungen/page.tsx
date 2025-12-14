// src/app/(public)/leistungen/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Leistungen — Praxis Andreas Wede',
  description:
    'Übersicht über die hausärztlichen Leistungen von Dr. Andreas Wede in Nienburg/Weser: Allgemeinmedizin, Suchtmedizinische Grundversorgung, Palliativmedizin und mehr.',
};

export default function LeistungenPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-grid">
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
            <div className="home-hero-text-col">
              <h1 className="page-title">Unsere Leistungen</h1>
              <p className="text-lg text-gray-600 mb-8">
                Umfassende hausärztliche Versorgung für Erwachsene und Kinder in Nienburg.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leistungen Cards */}
      <section className="home-section">
        <div className="container">
          <div className="home-section-cards">
            <div className="home-info-card">
              <div className="home-info-card-icon">
                <Image
                  src="/icons/icon-stethoscope.svg"
                  alt="Allgemeinmedizin"
                  width={36}
                  height={36}
                />
              </div>
              <h3 className="home-info-card-title">Allgemeinmedizin</h3>
              <p className="home-info-card-text">
                Vom Vorsorgegespräch bis zur Behandlung akuter Erkrankungen — wir begleiten Sie durch alle Lebensphasen.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600 text-sm">
                <li>• Vorsorge- und Check-up-Untersuchungen</li>
                <li>• Behandlung akuter und chronischer Erkrankungen</li>
                <li>• Impfberatung und Durchführung</li>
                <li>• Hausärztliche Versorgung von Erwachsenen und Kindern</li>
              </ul>
            </div>

            <div className="home-info-card">
              <div className="home-info-card-icon">
                <Image
                  src="/icons/icon-addiction.svg"
                  alt="Suchtmedizin"
                  width={36}
                  height={36}
                />
              </div>
              <h3 className="home-info-card-title">Suchtmedizinische Grundversorgung</h3>
              <p className="home-info-card-text">
                Vertrauliche Beratung und Behandlung bei Suchterkrankungen in Zusammenarbeit mit Fachstellen.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600 text-sm">
                <li>• Substitutionsbehandlung</li>
                <li>• Vertrauliche Suchtberatung</li>
                <li>• Entzugsbehandlung und Krisenintervention</li>
                <li>• Langzeitbetreuung und Verlaufskontrolle</li>
              </ul>
            </div>

            <div className="home-info-card">
              <div className="home-info-card-icon">
                <Image
                  src="/icons/icon-palliative.svg"
                  alt="Palliativmedizin"
                  width={36}
                  height={36}
                />
              </div>
              <h3 className="home-info-card-title">Palliativmedizinische Betreuung</h3>
              <p className="home-info-card-text">
                Menschliche Begleitung und Behandlung von Patienten mit unheilbaren Erkrankungen.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600 text-sm">
                <li>• Schmerztherapie und Symptomlinderung</li>
                <li>• Palliativmedizinische Hauskrankenpflege</li>
                <li>• Zusammenarbeit mit Hospizdiensten</li>
                <li>• Unterstützung für Angehörige</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Zusätzliche Leistungen */}
      <section className="home-section bg-gray-50">
        <div className="container">
          <h2 className="section-title">Weitere Leistungen</h2>
          <div className="grid gap-4 max-w-4xl">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <span className="text-gray-700">Diagnostik: Labor, EKG, Lungentest, Blutdrucklangzeitmessung</span>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <span className="text-gray-700">Schwerpunkt: Diabetes, Herz-Kreislauf-Erkrankungen, Asthma/COPD</span>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <span className="text-gray-700">Reisemedizinische Beratung und Impfungen</span>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <span className="text-gray-700">Verletzungsversorgung und Wundmanagement</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
