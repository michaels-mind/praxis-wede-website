// src/app/admin/layout.tsx
import type { ReactNode } from 'react';
import Link from 'next/link';
import '../globals.css';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className="scroll-smooth">
    <body className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 font-sans text-gray-900 antialiased">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white/95 backdrop-blur-md border-r border-blue-50/50 shadow-lg">
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
            <NavItem href="/admin/contact-messages" icon="📧" label="Nachrichten" />
            <NavItem href="/admin/announcements" icon="📢" label="Ankündigungen" />
            <NavItem href="/admin/opening-hours" icon="🕒" label="Öffnungszeiten" />
            <NavItem href="/admin/vacations" icon="🏖️" label="Urlaube" />

            <hr className="my-4 border-blue-50" />

            <NavItem href="/admin/patients" icon="👥" label="Patienten" />
            <NavItem href="/admin/documents" icon="📄" label="Dokumente" />
            <NavItem href="/admin/content" icon="✏️" label="Inhalte" />
          </nav>
        </aside>

        {/* Hauptbereich */}
        <div className="flex-1 flex flex-col">
          {/* Header oben */}
          <header className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 py-3 border-b border-blue-50/70 bg-white/90 backdrop-blur-md">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="font-semibold text-blue-700">Admin-Panel</span>
              <span className="hidden sm:inline text-gray-400">·</span>
              <span className="hidden sm:inline">Praxis Andreas Wede</span>
            </div>
            <div className="flex items-center gap-3">
              {/* Zurück zum Dashboard – auf Dashboard selbst verstecken die Pages einfach */}
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
    </body>
    </html>
  );
}

/* Kleinere Nav-Komponente im gleichen File */
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
