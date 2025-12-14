import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Praxis  Praxis Andreas Wede',
  description:
    'Informationen zur Praxis von Dr. Andreas Wede in Nienburg/Weser: Team, Praxisprofil, Lage, Anfahrt und Barrierefreiheit.',
};

export default function PraxisPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-grid">
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
            <div className="home-hero-text-col">
              <h1 className="page-title">Praxis Dr. Andreas Wede</h1>
              <p className="text-lg text-gray-600 mb-8">
                Hausärztliche Versorgung mit Erfahrung und Menschlichkeit seit über 20 Jahren in Nienburg
              </p>
              <div className="home-hero-actions">
                <Link href="/kontakt" className="hero-primary-link">
                  Termin vereinbaren
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="home-section-cards">
            <div className="home-info-card">
              <div className="home-info-card-icon">
                <Image src="/icons/icon-location.svg" alt="Adresse" width={36} height={36} />
              </div>
              <h3 className="home-info-card-title">Adresse & Anfahrt</h3>
              <p className="home-info-card-text">
                Dr. Andreas Wede<br />
                XYZ-Straße 1<br />
                31582 Nienburg/Weser
              </p>
              <ul className="mt-4 space-y-2 text-gray-600 text-sm">
                <li> Gute Erreichbarkeit mit Auto und öffentlichen Verkehrsmitteln</li>
                <li> Parkmöglichkeiten in der Nähe</li>
                <li> Bus-Haltestelle in 2 Minuten Fußweg</li>
              </ul>
            </div>

            <div className="home-info-card">
              <div className="home-info-card-icon">
                <Image src="/icons/icon-accessibility.svg" alt="Barrierefreiheit" width={36} height={36} />
              </div>
              <h3 className="home-info-card-title">Barrierefreiheit</h3>
              <p className="home-info-card-text">
                Die Praxis ist für alle Patientinnen und Patienten gut erreichbar.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600 text-sm">
                <li> Stufenfreier Zugang zur Praxis</li>
                <li> Barrierefreie Sanitäranlagen vorhanden</li>
                <li> Aufzug im Gebäude verfügbar</li>
                <li> Bitte Unterstützungsbedarf telefonisch mitteilen</li>
              </ul>
            </div>

            <div className="home-info-card">
              <div className="home-info-card-icon">
                <Image src="/icons/icon-team.svg" alt="Team" width={36} height={36} />
              </div>
              <h3 className="home-info-card-title">Unser Team</h3>
              <p className="home-info-card-text">
                Freundliche Unterstützung bei Anmeldung, Untersuchungen und organisatorischen Fragen.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600 text-sm">
                <li> Empfang und Terminvergabe</li>
                <li> Unterstützung bei Blutentnahmen</li>
                <li> Hilfe bei Rezepten, Überweisungen und Formularen</li>
                <li> 3 Medizinische Fachangestellte</li>
                <li> 1 Verwaltungskraft</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section bg-gray-50">
        <div className="container">
          <h2 className="section-title">Dr. Andreas Wede - Ihr Hausarzt</h2>
          <p className="text-gray-600 mb-8 max-w-4xl">
            Dr. Andreas Wede ist seit vielen Jahren als Hausarzt tätig und betreut Patientinnen und Patienten aus Nienburg und Umgebung. Im Mittelpunkt stehen eine verlässliche Begleitung im Alltag und ein offenes Gespräch über gesundheitliche Fragen.
          </p>
          <div className="grid gap-4 max-w-4xl">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <span className="text-gray-700">Facharzt für Allgemeinmedizin</span>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <span className="text-gray-700">Hausärztliche Versorgung von Erwachsenen und Kindern</span>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <span className="text-gray-700">Palliativmedizinische Betreuung</span>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <span className="text-gray-700">Suchtmedizinische Grundversorgung</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
