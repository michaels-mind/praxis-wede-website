// src/app/layout.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Praxis Andreas Wede – Hausarzt in Nienburg/Weser',
  description:
    'Hausarztpraxis Andreas Wede in Nienburg/Weser: Informationen zu Sprechzeiten, Leistungen, Kontakt und aktuellen Hinweisen.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="site-body">
        {/* Skip-Link für Tastaturnutzer */}
        <a href="#main-content" className="skip-link">
          Zum Inhalt springen
        </a>

        <div className="site-shell">
          <header className="site-header">
            <div className="site-header-inner">
              <Link href="/" className="site-brand">
                <span className="site-brand-title">Praxis Andreas Wede</span>
                <span className="site-brand-subtitle">
                  Hausarztpraxis in Nienburg/Weser
                </span>
              </Link>

              <nav
                className="main-nav"
                role="navigation"
                aria-label="Hauptnavigation"
              >
                <ul className="main-nav-list">
                  <li>
                    <Link href="/" className="main-nav-link">
                      Startseite
                    </Link>
                  </li>
                  <li>
                    <Link href="/leistungen" className="main-nav-link">
                      Leistungen
                    </Link>
                  </li>
                  <li>
                    <Link href="/praxis" className="main-nav-link">
                      Praxis
                    </Link>
                  </li>
                  <li>
                    <Link href="/kontakt" className="main-nav-link">
                      Kontakt
                    </Link>
                  </li>
                  <li>
                    <Link href="/downloads" className="main-nav-link">
                      Downloads
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          <main id="main-content" className="site-main" tabIndex={-1}>
            <div className="page-container">{children}</div>
          </main>

          <footer className="site-footer">
            <div className="site-footer-inner">
              <div className="site-footer-info">
                <p className="site-footer-title">Praxis Andreas Wede</p>
                <p>
                  XYZ-Straße 1
                  <br />
                  31582 Nienburg/Weser
                </p>
                <p>
                  Telefon:{' '}
                  <a href="tel:+495021000000">+49 (0)5021 000000</a>
                </p>
              </div>

              <div className="site-footer-links">
                <Link href="/impressum" className="footer-link">
                  Impressum
                </Link>
                <Link href="/datenschutz" className="footer-link">
                  Datenschutz
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
