import type { Metadata } from 'next';
import Link from 'next/link';
import '../globals.css';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Praxis Andreas Wede – Hausarzt in Nienburg/Weser',
  description:
    'Hausarztpraxis Andreas Wede in Nienburg/Weser: Informationen zu Sprechzeiten, Leistungen, Kontakt und aktuellen Hinweisen.',
};

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Skip-Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200/50 top-4 left-4 rounded-lg shadow-lg"
      >
        Zum Inhalt springen
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-blue-50/50 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 shadow-sm">
        <div className="container mx-auto h-20 flex items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight group">
            <span className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-all duration-300 bg-gradient-to-r from-transparent via-transparent to-blue-600 bg-[length:0%_100%] group-hover:bg-[length:100%_100%] bg-no-repeat bg-right">
              Praxis Andreas Wede
            </span>
            <span className="text-xs md:text-sm text-gray-600 font-medium bg-blue-50/50 px-2 py-0.5 rounded-full group-hover:bg-blue-100 transition-colors">
              Hausarztpraxis in Nienburg/Weser
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:block" role="navigation" aria-label="Hauptnavigation">
            <ul className="flex items-center gap-8 text-sm font-semibold text-gray-700">
              <li><Link href="/" className="hover:text-blue-600 transition-all duration-300 py-2 relative hover:after:w-full after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-blue-600 after:transition-all after:w-0">Startseite</Link></li>
              <li><Link href="/leistungen" className="hover:text-blue-600 transition-all duration-300 py-2 relative hover:after:w-full after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-blue-600 after:transition-all after:w-0">Leistungen</Link></li>
              <li><Link href="/praxis" className="hover:text-blue-600 transition-all duration-300 py-2 relative hover:after:w-full after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-blue-600 after:transition-all after:w-0">Praxis</Link></li>
              <li><Link href="/kontakt" className="hover:text-blue-600 transition-all duration-300 py-2 relative hover:after:w-full after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-blue-600 after:transition-all after:w-0">Kontakt</Link></li>
              <li><Link href="/downloads" className="hover:text-blue-600 transition-all duration-300 py-2 relative hover:after:w-full after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-blue-600 after:transition-all after:w-0">Downloads</Link></li>
            </ul>
          </nav>

          {/* Mobile Menu (platzhalter) */}
          <button className="md:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
            <span className="sr-only">Menü öffnen</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-1 w-full focus:outline-none">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
