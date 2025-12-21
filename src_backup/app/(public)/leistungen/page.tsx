// src/app/(public)/leistungen/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Leistungen — Praxis Andreas Wede',
  description:
    'Übersicht über die hausärztlichen Leistungen, Vorsorgeuntersuchungen, Suchtmedizin und Palliativversorgung.',
};

export default function LeistungenPage() {
  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-leistungen-wede.webp"
            alt="Medizinische Leistungen Dr. Wede"
            fill
            className="object-cover object-center opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Ganzheitliche Medizin <br />
              <span className="text-blue-400">für Ihre Gesundheit.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
              Umfassende hausärztliche Versorgung in Nienburg.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <a
                href="https://www.bundesaerztekammer.de/fileadmin/user_upload/BAEK/Themen/Internationales/Bundesaerztekammer_Deklaration_von_Genf_04.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:text-white transition-colors border-b border-gray-600 hover:border-white pb-0.5"
              >
                Orientiert am Ärztlichen Gelöbnis (2017) ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Karte 1: Hausärztliche Versorgung */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🩺</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hausärztliche Versorgung</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Basisversorgung für alle Kassen- und Privatpatienten.
              </p>
              <ul className="space-y-3 mt-auto">
                {[
                  'Akutsprechstunde & Diagnostik',
                  'Hausarztzentrierte Versorgung (HZV)',
                  'Verletzungsversorgung',
                  'Wundmanagement',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Karte 2: Chronische Erkrankungen */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chronische Erkrankungen</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Strukturierte DMP-Programme.
              </p>
              <ul className="space-y-3 mt-auto">
                {[
                  'KHK (Koronare Herzerkrankung)',
                  'Diabetes Mellitus Typ 2',
                  'Asthma bronchiale',
                  'COPD (Lungenerkrankung)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-rose-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Karte 3: Vorsorge & Check-ups */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Vorsorge & Check-ups</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Früherkennung für Ihre Gesundheit.
              </p>

              <div className="mt-auto space-y-2">
                {[
                  { l: 'J1 / Jugendschutz', a: '12-17 J.' },
                  { l: 'Check-Up (einmalig)', a: '18-35 J.' },
                  { l: 'Check-Up (alle 3J)', a: 'ab 35 J.' },
                  { l: 'Hautkrebsscreening', a: 'ab 35 J.' },
                  { l: 'Krebsvorsorge Mann', a: 'ab 45 J.' },
                  { l: 'Check-Up 45+ (HZV)', a: 'ab 45 J.' },
                  { l: 'Darmkrebs / Aneurysma', a: 'ab 55/65 J.' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-baseline text-sm border-b border-gray-50 pb-1 last:border-0 last:pb-0"
                  >
                    <span className="text-gray-700">{item.l}</span>
                    <span className="text-gray-400 text-xs font-medium ml-2 whitespace-nowrap">
                      {item.a}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Karte 4: Impfungen & Reisen */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">💉</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Impfungen & Reisen</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Prävention gemäß STIKO.
              </p>
              <ul className="space-y-3 mt-auto">
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="text-sky-500 mt-1">•</span>
                  <span>Alle Standardimpfungen</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="text-sky-500 mt-1">•</span>
                  <span>Reisemedizinische Beratung (IGeL)</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 leading-snug">
                  <span className="font-semibold text-gray-700">IGeL Hinweis:</span> Nur medizinisch sinnvolle
                  Leistungen.{' '}
                  <a
                    href="https://www.igel-monitor.de/startseite.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-600"
                  >
                    Zum IGeL-Monitor
                  </a>
                </p>
              </div>
            </div>

            {/* Karte 5: Suchtmedizin */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🧩</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Suchtmedizin</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Vertrauliche Grundversorgung.
              </p>
              <ul className="space-y-3 mt-auto">
                {[
                  'Substitutionstherapie (Opioid)',
                  'Psychosoziale Betreuung',
                  'Kooperation mit Fachstellen',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Karte 6: Palliativmedizin */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Palliativmedizin</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Würdevolle Begleitung.
              </p>
              <ul className="space-y-3 mt-auto">
                {[
                  'Hausbesuche am Lebensende',
                  'SAPV Versorgung',
                  'Zusammenarbeit Palliativstützpunkte',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
