import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Downloads — Praxis Andreas Wede',
  description:
    'Wichtige Dokumente der Praxis Dr. Andreas Wede in Nienburg/Weser zum Herunterladen, zum Beispiel Vereinbarungen und Formulare.',
};

export default function DownloadsPage() {
  return (
    <main className="min-h-screen bg-gray-50/50">
      
      {/* Hero Section – heller Praxis-Look */}
      <section className="relative w-full h-[320px] md:h-[380px] flex items-center bg-gradient-to-br from-white via-blue-50/80 to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-downloads-wede.webp"
            alt="Downloads und Dokumente Praxis Dr. Wede"
            fill
            className="object-cover object-center opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/95 via-white/90 to-indigo-50/80" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 bg-clip-text text-transparent">
              Service & Downloads. <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Informationen zum Mitnehmen.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed max-w-2xl">
              Wichtige Unterlagen und Formulare ganz einfach herunterladen. So können Sie alles in Ruhe zu Hause durchlesen und ausgefüllt zum Termin mitbringen.
            </p>
          </div>
        </div>
      </section>

      {/* Downloads List Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Verfügbare Dokumente
            </h2>

            <div className="grid gap-6">

              {/* Ärztliches Gelöbnis */}
              <div className="group bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      Ärztliches Gelöbnis (Deutsch)
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Informationsblatt zum ärztlichen Selbstverständnis und den ethischen Grundsätzen.
                    </p>
                  </div>
                </div>

                <a
                  href="/forms/ÄrztlichesGelöbnisDeutsch.pdf"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap group-hover:shadow-md"
                  download
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  PDF Download
                </a>
              </div>

              {/* Aufnahmebogen Neupatienten */}
              <div className="group bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">📄</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      Aufnahmebogen für Neupatienten
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Bitte vor Ihrem ersten Termin ausfüllen und mitbringen, damit wir Ihre Daten vollständig erfassen können.
                    </p>
                  </div>
                </div>

                <a
                  href="/forms/Aufnahmebogen Neupatienten.pdf"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap group-hover:shadow-md"
                  download
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  PDF Download
                </a>
              </div>

              {/* Blutdruckprotokoll */}
              <div className="group bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🩺</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      Blutdruckprotokoll
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Zur Dokumentation Ihrer Blutdruckwerte über einen bestimmten Zeitraum.
                    </p>
                  </div>
                </div>

                <a
                  href="/forms/Blutdruckprotokoll.pdf"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap group-hover:shadow-md"
                  download
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  PDF Download
                </a>
              </div>

              {/* Blutzuckertagesprofil */}
              <div className="group bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🩸</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      Blutzuckertagesprofil
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Formular zur Erfassung Ihrer Blutzuckerwerte im Tagesverlauf.
                    </p>
                  </div>
                </div>

                <a
                  href="/forms/Blutzuckertagesprofil.pdf"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap group-hover:shadow-md"
                  download
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  PDF Download
                </a>
              </div>

              {/* Einverständnis Datenschutz */}
              <div className="group bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      Einverständnis Datenschutz
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Einwilligung zur Verarbeitung Ihrer Gesundheitsdaten gemäß Datenschutzbestimmungen.
                    </p>
                  </div>
                </div>

                <a
                  href="/forms/EinverständnisDatenschutz.pdf"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap group-hover:shadow-md"
                  download
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  PDF Download
                </a>
              </div>

              {/* Praxisregeln */}
              <div className="group bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">📘</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      Praxisregeln
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Übersicht über wichtige organisatorische Abläufe und Regeln in der Praxis.
                    </p>
                  </div>
                </div>

                <a
                  href="/forms/Praxisregeln.pdf"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap group-hover:shadow-md"
                  download
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  PDF Download
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Info Box */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-blue-50 rounded-2xl p-8 border border-blue-100 flex items-start gap-4">
            <span className="text-3xl">💡</span>
            <div>
              <h4 className="font-bold text-blue-900 mb-2">Hinweis zum PDF-Format</h4>
              <p className="text-blue-800/80 text-sm leading-relaxed">
                Zum Öffnen der Dateien benötigen Sie einen PDF-Reader (z.B. Adobe Acrobat Reader), der auf den meisten Geräten bereits vorinstalliert ist.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
