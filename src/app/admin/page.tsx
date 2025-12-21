// app/admin/page.tsx
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

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <Link href="/admin/contact-messages" className="group">
          <StatCard
            title="Neue Nachrichten"
            value={12}
            icon="📧"
            color="primary"
            className="group-hover:shadow-2xl group-hover:shadow-blue-500/25 group-hover:-translate-y-2 group-hover:border-blue-200 transition-all duration-300 h-full border border-gray-100 hover:border-blue-200 bg-white/80 backdrop-blur-sm"
          />
        </Link>

        <Link href="/admin/announcements" className="group">
          <StatCard
            title="Ankündigungen"
            value={3}
            icon="📢"
            color="accent"
            className="group-hover:shadow-2xl group-hover:shadow-emerald-500/25 group-hover:-translate-y-2 group-hover:border-emerald-200 transition-all duration-300 h-full border border-gray-100 hover:border-emerald-200 bg-white/80 backdrop-blur-sm"
          />
        </Link>

        <Link href="/admin/opening-hours" className="group">
          <StatCard
            title="Öffnungszeiten"
            value={7}
            icon="🕒"
            color="success"
            className="group-hover:shadow-2xl group-hover:shadow-green-500/25 group-hover:-translate-y-2 group-hover:border-green-200 transition-all duration-300 h-full border border-gray-100 hover:border-green-200 bg-white/80 backdrop-blur-sm"
          />
        </Link>

        <Link href="/admin/vacations" className="group">
          <StatCard
            title="Urlaube"
            value={2}
            icon="🏖️"
            color="warning"
            className="group-hover:shadow-2xl group-hover:shadow-orange-500/25 group-hover:-translate-y-2 group-hover:border-orange-200 transition-all duration-300 h-full border border-gray-100 hover:border-orange-200 bg-white/80 backdrop-blur-sm"
          />
        </Link>
      </section>
    </>
  );
}
