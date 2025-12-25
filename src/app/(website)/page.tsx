import Link from 'next/link';
import Image from 'next/image';
import { getAnnouncements, getOpeningHours, getVacations } from '@/lib/admin';
import BookingButton from '@/components/medatixx/BookingButton'; 
import { GoogleReviews } from '@/components/GoogleReviews';

// Cache für 1 Stunde (ISR)
export const revalidate = 3600;

// Daten-Abruf
async function getHomeData() {
  const [announcements, rawOpeningHours, vacations] = await Promise.all([
    getAnnouncements(),
    getOpeningHours(),
    getVacations(),
  ]);

  // WICHTIG: Filtern und Sortieren der Öffnungszeiten
  // Wir zeigen auf der Startseite nur Mo(1) bis Fr(5) an
  const openingHours = rawOpeningHours
    ?.filter((h: any) => h.day_of_week >= 1 && h.day_of_week <= 5)
    .sort((a: any, b: any) => a.day_of_week - b.day_of_week);

  return { announcements, openingHours, vacations };
}

export default async function HomePage() {
  const { announcements, openingHours, vacations } = await getHomeData();
  const medatixxId = process.env.NEXT_PUBLIC_MEDATIXX_UUID || '';

  // 🎯 FIX: Robuster Urlaubs-Check (Datum ohne Uhrzeit vergleichen)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // "Heute" auf Mitternacht setzen

  const currentVacation = vacations?.find((v: any) => {
    // Startdatum auf Mitternacht setzen
    const start = new Date(v.start_date);
    start.setHours(0, 0, 0, 0);
    
    // Enddatum auf Ende des Tages setzen (damit der letzte Tag noch zählt)
    const end = new Date(v.end_date);
    end.setHours(23, 59, 59, 999);

    return today >= start && today <= end;
  });

  return (
    <main className="bg-gray-50/50 min-h-screen">
      
      {/* Hero Section - HELLER PRAXIS-LOOK */}
      <section className="relative w-full bg-gradient-to-br from-white via-blue-50/80 to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-home-wede.webp" 
            alt="Praxis Andreas Wede"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/95 via-white/90 to-indigo-50/80" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 bg-clip-text text-transparent">
              Ihre vertrauensvolle Praxis <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent">für ganzheitliche Medizin.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed font-medium">
              Willkommen bei Andreas Wede. Wir bieten Ihnen professionelle medizinische Betreuung mit modernster Technik und persönlicher Zuwendung in Nienburg.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <BookingButton 
                configId={medatixxId}
                label="📅 Termin buchen"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:from-blue-700 hover:to-blue-800 transition-all cursor-pointer transform hover:-translate-y-1 border border-blue-500/20"
              />
              <Link 
                href='/leistungen' 
                className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-blue-100 text-blue-700 font-semibold rounded-xl hover:bg-blue-50 hover:border-blue-200 hover:shadow-md transition-all"
              >
                Unsere Leistungen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Urlaubs-Banner (Alert Style) */}
      {currentVacation && (
        <div className="bg-red-50 border-b border-red-100">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-start gap-4 text-red-800">
              <span className="text-xl">🏖️</span>
              <div>
                <strong className="block font-semibold">Praxis geschlossen</strong>
                <span className="text-sm">
                  Vom {new Date(currentVacation.start_date).toLocaleDateString('de-DE')} bis {new Date(currentVacation.end_date).toLocaleDateString('de-DE')}. 
                  {currentVacation.description && ` Grund: ${currentVacation.description}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ankündigungs-Banner (Info Style) */}
      {announcements && announcements.length > 0 && (
        <div className="bg-blue-50 border-b border-blue-100">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {announcements.slice(0, 2).map((announcement: any) => (
              <div key={announcement.id} className="flex items-start gap-4 text-blue-900">
                <span className="text-xl">📢</span>
                <div>
                  <strong className="block font-semibold">{announcement.title}</strong>
                  <span className="text-sm text-blue-800">{announcement.content}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Cards Grid - Neuer Premium Look */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wide text-sm uppercase mb-2 block">Willkommen</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Unsere Services im Überblick</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Karte: Leistungen */}
            <Link href='/leistungen' className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col h-full">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Leistungen</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Von der Vorsorge bis zur Therapie. Entdecken Sie unser umfangreiches medizinisches Angebot.
              </p>
              <span className="mt-auto text-blue-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Mehr erfahren <span>→</span>
              </span>
            </Link>

            {/* Karte: Öffnungszeiten */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col h-full">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">🕒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Öffnungszeiten</h3>
              <div className="space-y-3 w-full">
                {openingHours && openingHours.length > 0 ? (
                  openingHours.map((hour: any) => {
                    // Mapping Array für Wochentage (Index 0 = Sonntag, wird hier aber nicht genutzt wegen Filter)
                    const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
                    const dayLabel = days[hour.day_of_week] || 'Tag';
                    
                    // Format Helper
                    const fmt = (t: string) => t ? t.slice(0, 5) : '';

                    return (
                      <div key={hour.id} className="flex justify-between items-start text-sm border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                        <span className="font-medium text-gray-500 w-8 mt-0.5">{dayLabel}</span>
                        <div className="text-right">
                          {hour.is_closed ? (
                            <span className="text-gray-400">Geschlossen</span>
                          ) : (
                            <div className="flex flex-col items-end gap-0.5">
                              {hour.morning_start && (
                                <span className="text-gray-900 font-medium">
                                  {fmt(hour.morning_start)} - {fmt(hour.morning_end)}
                                </span>
                              )}
                              {hour.afternoon_start && (
                                <span className="text-gray-900 font-medium">
                                  {fmt(hour.afternoon_start)} - {fmt(hour.afternoon_end)}
                                </span>
                              )}
                              {!hour.morning_start && !hour.afternoon_start && (
                                <span>Geöffnet</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">Bitte kontaktieren Sie uns.</p>
                )}
              </div>
            </div>

            {/* Karte: Kontakt */}
            <Link href='/kontakt' className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col h-full">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Kontakt</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Haben Sie Fragen oder benötigen Sie ein Rezept? Schreiben Sie uns oder rufen Sie an.
              </p>
              <span className="mt-auto text-purple-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Zum Kontaktformular <span>→</span>
              </span>
            </Link>

          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <div className="bg-white py-12 border-y border-gray-50">
        <GoogleReviews />
      </div>

      {/* CTA Section - Heller Kontrast */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">Bereit für Ihren Termin?</h2>
          <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed drop-shadow-md">
            Buchen Sie jetzt ganz bequem online Ihren nächsten Arzttermin – rund um die Uhr, ohne Wartezeit am Telefon.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <BookingButton 
              configId={medatixxId}
              label="📅 Jetzt Termin buchen"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl shadow-lg shadow-white/30 hover:shadow-white/50 hover:bg-white/90 transition-all cursor-pointer transform hover:-translate-y-0.5 border-2 border-white/20"
            />
            <Link href='/kontakt' className='inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-white/30 transition-all shadow-lg shadow-white/20'>
              📞 Kontakt
            </Link>
            <a 
              href="https://www.whatsapp.com/channel/0029VaCGpDb8vd1ITGPG800l" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#25D366]/90 text-white font-semibold rounded-xl hover:bg-[#25D366] transition-all shadow-lg shadow-green-500/30 gap-2 backdrop-blur-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
