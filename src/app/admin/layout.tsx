import type { ReactNode } from 'react';
import Link from 'next/link';
// import '../globals.css'; // Nicht nötig, kommt vom Root Layout

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    // WICHTIG: Kein <html> oder <body> hier! Nur ein div als Wrapper.
    <div className="flex min-h-screen bg-gray-50/30">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white/95 backdrop-blur-md border-r border-blue-50/50 shadow-lg fixed h-full z-10">
          <div className="p-6 border-b border-blue-50">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
              Admin-Panel
            </h2>
            <p className="text-xs text-blue-600 font-medium mt-1">
              Praxis Andreas Wede
            </p>
          </div>

          <nav className="mt-6 px-4 space-y-2">
            <NavItem href="/admin" icon="📊" label="Dashboard" />
            <NavItem href="/admin/announcements" icon="📢" label="Ankündigungen" />
            <NavItem href="/admin/opening-hours" icon="🕒" label="Öffnungszeiten" />
            <NavItem href="/admin/vacations" icon="🏖️" label="Urlaube" />
          </nav>
        </aside>

        {/* Hauptbereich - margin-left für Sidebar Platzhalter */}
        <div className="flex-1 flex flex-col lg:ml-64">
          {/* Header oben */}
          <header className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 py-3 border-b border-blue-50/70 bg-white/90 backdrop-blur-md">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="font-semibold text-blue-700">Admin-Panel</span>
              <span className="hidden sm:inline text-gray-400">·</span>
              <span className="hidden sm:inline">Praxis Andreas Wede</span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 hover:shadow-sm transition-all"
              >
                ← Zum Dashboard
              </Link>
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 transition-all shadow-md text-sm"
              >
                <span>🚪</span>
                Logout
              </Link>
            </div>
          </header>

          {/* Page-Content */}
          <main className="flex-1 p-6 md:p-10">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 hover:shadow-praxis transition-all"
    >
      <span className="text-xl">{icon}</span>
      {label}
    </Link>
  );
}
