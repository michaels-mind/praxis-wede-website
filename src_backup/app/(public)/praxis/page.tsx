import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Praxis — Praxis Andreas Wede',
  description:
    'Informationen zur Praxis von Dr. Andreas Wede in Nienburg/Weser: Team, Praxisprofil, Lage, Anfahrt und Barrierefreiheit.',
};

export default function PraxisPage() {
  return (
    <main className="min-h-screen bg-gray-50/50">
      
      {/* Hero Section - Consistent Premium Style */}
      <section className="relative w-full h-[450px] flex items-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/praxis-team-wede.webp"
            alt="Praxis Team Dr. Wede"
            fill
            className="object-cover object-center opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Ihre Hausarztpraxis <br />
              <span className="text-blue-400">in Nienburg/Weser.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
              Hausärztliche Versorgung mit Erfahrung und Menschlichkeit seit über 20 Jahren.
            </p>
            <Link 
              href="/kontakt" 
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/40 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              Termin vereinbaren
            </Link>
          </div>
        </div>
      </section>

      {/* Info Cards Grid - 3 Columns */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Karte 1: Adresse */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                {/* Fallback Icon für Location */}
                <span className="text-2xl">📍</span> 
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Adresse & Anfahrt</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Dr. Andreas Wede<br />
                Marienstraße 2<br />
                31582 Nienburg/Weser
              </p>
              <ul className="space-y-3 mt-auto">
                {['Zentral in Nienburg', 'Gute Verkehrsanbindung', 'Bushaltestelle in 2 Min.'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Karte 2: Barrierefreiheit */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">♿</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Barrierefreiheit</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Zugang für alle Patienten möglich.
              </p>
              <ul className="space-y-3 mt-auto">
                {['Stufenfreier Zugang', 'Barrierefreie Sanitäranlagen', 'Aufzug im Gebäude', 'Unterstützung auf Anfrage'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-green-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Karte 3: Team */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Unser Team</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Kompetente Unterstützung bei allen Anliegen.
              </p>
              <ul className="space-y-3 mt-auto">
                {['Empfang & Terminvergabe', 'Blutentnahme & Labor', 'Rezeptmanagement', 'Erfahrene MFA'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>
      </section>

      {/* About Section - Modernized */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Dr. Andreas Wede - Ihr Hausarzt</h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Dr. Andreas Wede ist seit vielen Jahren als Hausarzt tätig und betreut Patientinnen und Patienten aus Nienburg und Umgebung. Im Mittelpunkt stehen eine verlässliche Begleitung im Alltag und ein offenes Gespräch über gesundheitliche Fragen.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Facharzt für Allgemeinmedizin",
                "Hausärztliche Versorgung (Kinder & Erwachsene)",
                "Palliativmedizinische Betreuung",
                "Suchtmedizinische Grundversorgung"
              ].map((text, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <span className="font-medium text-gray-800">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
