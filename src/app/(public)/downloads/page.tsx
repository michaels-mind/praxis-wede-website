import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Downloads — Praxis Andreas Wede',
  description:
    'Wichtige Dokumente der Praxis Dr. Andreas Wede in Nienburg/Weser zum Herunterladen, zum Beispiel Vereinbarungen und Formulare.',
};

export default function DownloadsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-grid">
            <div className="home-hero-image-col">
              <Image
                src="/images/hero-downloads-wede.webp"
                alt="Downloads und Dokumente Praxis Dr. Wede"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>
            <div className="home-hero-text-col">
              <h1 className="page-title">Downloads</h1>
              <p className="text-lg text-gray-600 mb-8">
                Wichtige Unterlagen und Formulare zum Herunterladen. In Ruhe zu
                Hause lesen und ausgefüllt mitbringen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <h2 className="section-title">Verfügbare Dokumente</h2>

          <div className="grid gap-4 max-w-4xl">
            <div className="bg-white p-6 rounded-lg border border-gray-200 flex items-center justify-between hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-700">
                  Honorarausfallvereinbarung für die Terminsprechstunde am Nachmittag
                </span>
              </div>
              <a
                href="/documents/honorarausfall-terminsprechstunde.pdf"
                className="hero-primary-link text-sm"
                download
              >
                Download PDF
              </a>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <span className="text-gray-600">Weitere Formulare und Informationsblätter folgen in Kürze</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
