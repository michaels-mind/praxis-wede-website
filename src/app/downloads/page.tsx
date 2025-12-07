// src/app/downloads/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Downloads – Praxis Andreas Wede',
  description:
    'Wichtige Dokumente der Praxis Dr. Andreas Wede in Nienburg/Weser zum Herunterladen, zum Beispiel Vereinbarungen und Formulare.',
};

export default function DownloadsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="home-hero-grid">
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
        <div className="flex items-center justify-center p-8 md:p-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Downloads
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Wichtige Unterlagen und Formulare zum Herunterladen. In Ruhe zu
              Hause lesen und ausgefüllt mitbringen.
            </p>
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="max-w-6xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Verfügbare Dokumente
        </h2>

        <div className="admin-list">
          <div className="admin-list-item">
            <span>
              Honorarausfallvereinbarung für die Terminsprechstunde am
              Nachmittag (PDF)
            </span>
            <a
              href="/documents/honorarausfall-terminsprechstunde.pdf"
              className="home-contact-link ml-2"
              download
            >
              Herunterladen
            </a>
          </div>

          <div className="admin-list-item">
            <span>Weitere Formulare und Informationsblätter folgen in Kürze</span>
          </div>
        </div>
      </section>
    </main>
  );
}
