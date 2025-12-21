// app/admin/page.tsx
import Link from 'next/link';
import { StatCard } from './components/StatCard';

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30">
      {/* Sidebar Navigation - Admin only */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white/95 backdrop-blur-md border-r border-blue-50/50 shadow-lg z-40 hidden lg:block">
        <div className="p-6 border-b border-blue-50">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
            Admin-Panel
          </h2>
          <p className="text-xs text-blue-600 font-medium mt-1">Praxis Wede</p>
        </div>
        
        <nav className="mt-6 px-4 space-y-2">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 hover:shadow-praxis transition-all group aria-[current=page]:bg-blue-600 aria-[current=page]:text-white"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">📊</span>
            Dashboard
          </Link>
          
          <Link 
            href="/admin/contact-messages" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 hover:shadow-praxis transition-all group aria-[current=page]:bg-blue-600 aria-[current=page]:text-white"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">📧</span>
            Nachrichten
          </Link>
          
          <Link 
            href="/admin/announcements" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 hover:shadow-praxis transition-all group aria-[current=page]:bg-blue-600 aria-[current=page]:text-white"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">📢</span>
            Ankündigungen
          </Link>
          
          <Link 
            href="/admin/opening-hours" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 hover:shadow-praxis transition-all group aria-[current=page]:bg-blue-600 aria-[current=page]:text-white"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">🕒</span>
            Öffnungszeiten
          </Link>
          
          <Link 
            href="/admin/vacations" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 hover:shadow-praxis transition-all group aria-[current=page]:bg-blue-600 aria-[current=page]:text-white"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">🏖️</span>
            Urlaube
          </Link>
          
          <hr className="my-4 border-blue-50" />
          
          <Link 
            href="/admin/patients" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 hover:shadow-praxis transition-all group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">👥</span>
            Patienten
          </Link>
          
          <Link 
            href="/admin/documents" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 hover:shadow-praxis transition-all group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">📄</span>
            Dokumente
          </Link>
          
          <Link 
            href="/admin/content" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 hover:shadow-praxis transition-all group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">✏️</span>
            Inhalte
          </Link>
        </nav>
      </aside>

      {/* Mobile Menu Toggle */}
      <button className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-50 hover:shadow-xl transition-all">
        <span className="sr-only">Menü öffnen</span>
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main Content */}
      <div className="lg:ml-64 p-6 lg:p-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <header className="mb-12 lg:mb-16">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 bg-clip-text text-transparent mb-3">
                  Dashboard
                </h1>
                <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-md">
                  Überblick über Nachrichten, Hinweise und Praxisorganisation.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link 
                  href="/admin/profile" 
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 font-semibold rounded-xl hover:bg-blue-100 hover:shadow-md transition-all text-sm"
                >
                  <span>👤</span>
                  Profil
                </Link>
                <Link 
                  href="/api/auth/logout" 
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 transition-all shadow-md"
                >
                  <span>🚪</span>
                  Logout
                </Link>
              </div>
            </div>
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
        </div>
      </div>
    </main>
  );
}
