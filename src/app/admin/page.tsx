import Link from 'next/link';
import { StatCard } from './components/StatCard';

export default function AdminDashboard() {
  return (
    <>
      <header className="mb-12 lg:mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 bg-clip-text text-transparent mb-3">
          Dashboard
        </h1>
        <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-md">
          Überblick über Nachrichten, Hinweise und Praxisorganisation.
        </p>
      </header>

      {/* Grid angepasst auf 3 Spalten, da Nachrichten entfernt wurden */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        
        {/* Kontakt-Nachrichten entfernt (siehe Tech-Spec: Keine Speicherung) */}

        <Link href="/admin/announcements" className="group">
          <StatCard
            title="Ankündigungen"
            value={3} // Dies sollte idealerweise dynamisch geladen werden
            icon="📢"
            color="accent"
          />
        </Link>

        <Link href="/admin/opening-hours" className="group">
          <StatCard
            title="Öffnungszeiten"
            value={7}
            icon="🕒"
            color="success"
          />
        </Link>

        <Link href="/admin/vacations" className="group">
          <StatCard
            title="Urlaube"
            value={2}
            icon="🏖️"
            color="warning"
          />
        </Link>
      </section>
    </>
  );
}
