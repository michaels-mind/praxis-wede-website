// src/app/praxis/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Praxis – Praxis Andreas Wede',
  description:
    'Informationen zur Praxis von Dr. Andreas Wede in Nienburg/Weser: Team, Praxisprofil, Lage, Anfahrt und Barrierefreiheit.',
};

export default function PraxisPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section mit Team-Bild */}
      <section className="home-hero-grid">
        <div className="home-hero-image-col">
          <Image
            src="/images/praxis-team-wede.webp"
            alt="Praxis Team Dr. Wede"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>
        <div className="flex items-center justify-center p-8 md:p-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Praxis Dr. Andreas Wede
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Hausärztliche Versorgung mit Erfahrung und Menschlichkeit seit über 20 Jahren in Nienburg
            </p>
            <div className="home-hero-actions mt-8">
              <Link href="/kontakt" className="btn-primary">
                Termin vereinbaren
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Praxis Info Cards */}
      <section className="home-section-cards">
        <div className="home-info-card">
          <div className="leistung-card-icon">
            <Image src="/icons/icon-location.svg" alt="Adresse" width={48} height={48} />
          </div>
          <h3 className="text-xl font-semibold mb-4">Adresse & Anfahrt</h3>
          <p className="text-gray-600 mb-4">
            Dr. Andreas Wede<br />
            XYZ-Straße 1<br />
            31582 Nienburg/Weser
          </p>
          <ul className="leistung-card-list">
            <li>Gute Erreichbarkeit mit Auto und öffentlichen Verkehrsmitteln</li>
            <li>Parkmöglichkeiten in der Nähe</li>
            <li>Bus-Haltestelle in 2 Minuten Fußweg</li>
          </ul>
        </div>

        <div className="home-info-card">
          <div className="leistung-card-icon">
            <Image src="/icons/icon-accessibility.svg" alt="Barrierefreiheit" width={48} height={48} />
          </div>
          <h3 className="text-xl font-semibold mb-4">Barrierefreiheit</h3>
          <p className="text-gray-600 mb-4">
            Die Praxis ist für alle Patientinnen und Patienten gut erreichbar.
          </p>
          <ul className="leistung-card-list">
            <li>Stufenfreier Zugang zur Praxis</li>
            <li>Barrierefreie Sanitäranlagen vorhanden</li>
            <li>Aufzug im Gebäude verfügbar</li>
            <li>Bitte Unterstützungsbedarf telefonisch mitteilen</li>
          </ul>
        </div>

        <div className="home-info-card">
          <div className="leistung-card-icon">
            <Image src="/icons/icon-team.svg" alt="Team" width={48} height={48} />
          </div>
          <h3 className="text-xl font-semibold mb-4">Unser Team</h3>
          <p className="text-gray-600 mb-4">
            Freundliche Unterstützung bei Anmeldung, Untersuchungen und organisatorischen Fragen.
          </p>
          <ul className="leistung-card-list">
            <li>Empfang und Terminvergabe</li>
            <li>Unterstützung bei Blutentnahmen</li>
            <li>Hilfe bei Rezepten, Überweisungen und Formularen</li>
            <li>3 Medizinische Fachangestellte</li>
            <li>1 Verwaltungskraft</li>
          </ul>
        </div>
      </section>

      {/* Dr. Andreas Wede Profil */}
      <section className="max-w-6xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Dr. Andreas Wede - Ihr Hausarzt</h2>
        <p className="text-gray-600 mb-6">
          Dr. Andreas Wede ist seit vielen Jahren als Hausarzt tätig und betreut Patientinnen und Patienten aus Nienburg und Umgebung. Im Mittelpunkt stehen eine verlässliche Begleitung im Alltag und ein offenes Gespräch über gesundheitliche Fragen.
        </p>
        <div className="admin-list">
          <div className="admin-list-item">
            <span>Facharzt für Allgemeinmedizin</span>
          </div>
          <div className="admin-list-item">
            <span>Hausärztliche Versorgung von Erwachsenen und Kindern</span>
          </div>
          <div className="admin-list-item">
            <span>Palliativmedizinische Betreuung</span>
          </div>
          <div className="admin-list-item">
            <span>Suchtmedizinische Grundversorgung</span>
          </div>
        </div>
      </section>
    </main>
  );
}
