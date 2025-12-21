import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-100/50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Spalte 1: Brand & Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-gray-900 text-xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Praxis Andreas Wede
            </h3>
            <p className="leading-relaxed mb-6 max-w-sm text-gray-600 font-medium">
              Ihre Hausarztpraxis für ganzheitliche Medizin in Nienburg/Weser. 
              Wir begleiten Sie in allen Gesundheitsfragen mit Kompetenz und Menschlichkeit.
            </p>
            <div className="flex gap-4">
              {/* Socials / Kontakt Icons */}
              <a href="tel:+495021913166" className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-all shadow-sm hover:shadow-md">
                <span className="text-xl">📞</span>
              </a>
              <a href="https://wa.me/49123456789" className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center hover:bg-green-100 transition-all shadow-sm hover:shadow-md">
                <span className="text-xl">💬</span>
              </a>
            </div>
          </div>

          {/* Spalte 2: Kontakt */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-6 text-lg">Kontakt</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-1 text-xl">📍</span>
                <span className="text-gray-700">
                  Marienstraße 2<br />
                  31582 Nienburg/Weser
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500 text-xl">📞</span>
                <a href="tel:+495021913166" className="text-gray-900 font-semibold hover:text-blue-600 transition-colors hover:underline">05021 913166</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500 text-xl">📠</span>
                <span className="text-gray-700 font-semibold">05021 913168</span>
              </li>
            </ul>
          </div>

          {/* Spalte 3: Links */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-6 text-lg">Rechtliches</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/impressum" className="hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                  <span className="text-gray-700 font-medium hover:underline">Impressum</span>
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                  <span className="text-gray-700 font-medium hover:underline">Datenschutz</span>
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-blue-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                  <span className="text-gray-700 font-medium hover:underline">Kontakt</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 bg-gray-50/50 rounded-2xl p-6">
          <p className="text-gray-700 font-medium">© {currentYear} Praxis Andreas Wede. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6 text-gray-600">
            <span className="hover:text-gray-800 font-medium cursor-default transition-colors">Hausarztpraxis</span>
            <span className="hover:text-gray-800 font-medium cursor-default transition-colors">Nienburg</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
