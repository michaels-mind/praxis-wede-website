import type { Metadata } from 'next';
import Image from 'next/image';
import KontaktForm from './KontaktForm';

export const metadata: Metadata = {
  title: 'Kontakt — Praxis Andreas Wede',
  description:
    'Kontakt zur Praxis Dr. Andreas Wede in Nienburg/Weser: Telefonnummern, Adresse, Anfahrt.',
};

export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-gray-50/50">
      
      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-kontakt-wede.webp"
            alt="Kontaktaufnahme zur Praxis Dr. Wede"
            fill
            className="object-cover object-[50%_30%] opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Kontaktieren Sie uns. <br />
              <span className="text-blue-400">Wir sind für Sie da.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
              Hier finden Sie alle wichtigen Kontaktdaten der Praxis. In lebensbedrohlichen Notfällen wählen Sie bitte sofort die 112.
            </p>
          </div>
        </div>
      </section>

      {/* Info Cards Grid - 3 Columns */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            
            {/* Karte 1: Telefon */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Telefonnummern</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Für Termine und Rückfragen wenden Sie sich bitte telefonisch an uns.
              </p>
              <div className="mt-auto">
                <p className="text-sm font-medium text-gray-500 mb-1">Praxis:</p>
                <a href="tel:+495021913166" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  05021 913166
                </a>
                <p className="text-sm font-medium text-gray-500 mt-4 mb-1">Rezept-Telefon:</p>
                <a href="tel:+495021913168" className="text-lg font-bold text-gray-700 hover:text-blue-600 transition-colors">
                  05021 913168
                </a>
              </div>
            </div>

            {/* Karte 2: Adresse */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Adresse & Anfahrt</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Zentral gelegen in Nienburg/Weser.
              </p>
              <div className="mt-auto text-gray-800 font-medium">
                <p>Praxis Andreas Wede</p>
                <p>Marienstraße 2</p>
                <p>31582 Nienburg/Weser</p>
                
                <a 
                  href="https://maps.google.com/?q=Marienstraße+2,31582+Nienburg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-600 mt-4 hover:underline"
                >
                  Route planen →
                </a>
              </div>
            </div>

            {/* Karte 3: Notfälle */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full relative overflow-hidden">
              {/* Roter Akzent am Rand */}
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🚨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Notfälle</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Außerhalb der Sprechzeiten und in lebensbedrohlichen Situationen.
              </p>
              <div className="mt-auto space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Lebensgefahr:</p>
                  <a href="tel:112" className="text-2xl font-bold text-red-600 hover:text-red-700">112</a>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Ärztlicher Bereitschaftsdienst:</p>
                  <a href="tel:116117" className="text-xl font-bold text-gray-800 hover:text-blue-600">116 117</a>
                </div>
              </div>
            </div>
          </div>

          {/* Kontaktformular Section - AUSGEBLENDET */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 hidden">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Schreiben Sie uns</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Über das Formular können Sie uns für nicht dringende Anliegen eine Nachricht schicken.
                Bitte senden Sie keine vertraulichen Gesundheitsdaten.
              </p>
            </div>
            <KontaktForm />
          </div>

        </div>
      </section>
    </main>
  );
}
