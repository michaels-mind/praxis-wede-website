import Link from 'next/link';
import { getAnnouncements, getOpeningHours, getVacations } from '@/lib/admin';
import BookingButton from '@/components/medatixx/BookingButton'; 
import { GoogleReviews } from '@/components/GoogleReviews'; 

async function getHomeData() {
  const [announcements, openingHours, vacations] = await Promise.all([
    getAnnouncements(),
    getOpeningHours(),
    getVacations(),
  ]);

  return { announcements, openingHours, vacations };
}

export default async function HomePage() {
  const { announcements, openingHours, vacations } = await getHomeData();
  
  // Medatixx UUID aus Environment Variables (Fallback leer für Demo)
  const medatixxId = process.env.NEXT_PUBLIC_MEDATIXX_UUID || '';

  // Check if currently on vacation
  const today = new Date();
  const currentVacation = vacations?.find((v: any) => {
    const start = new Date(v.start_date);
    const end = new Date(v.end_date);
    return today >= start && today <= end;
  });

  return (
    <main className='home-page'>
      {/* Hero Section */}
      <section className='home-hero'>
        <div className='container'>
          <div className='home-hero-grid'>
            <div className='home-hero-content'>
              <h1 className='home-hero-title'>
                Ihre vertrauensvolle Praxis für ganzheitliche Medizin
              </h1>
              <p className='home-hero-text'>
                Willkommen in der Praxis Andreas Wede. Wir bieten Ihnen 
                professionelle medizinische Betreuung mit modernster Technik 
                und persönlicher Zuwendung.
              </p>
              <div className='home-hero-actions'>
                {/* MEDATIXX INTEGRATION: Primärer Button */}
                <BookingButton 
                  configId={medatixxId}
                  label="📅 Termin buchen"
                  className="hero-primary-link cursor-pointer"
                />
                
                <Link 
                  href='/leistungen' 
                  className='hero-secondary-link'
                >
                  Unsere Leistungen
                </Link>
              </div>
            </div>
            <div className='home-hero-image'>
              <div className='hero-image-placeholder'>
                🏥
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vacation Banner - if currently on vacation */}
      {currentVacation && (
        <section className='vacation-banner vacation-banner--critical'>
          <div className='container'>
            <div className='vacation-banner-content'>
              <span className='vacation-banner-icon'>🏖️</span>
              <div>
                <strong>Praxis geschlossen vom {new Date(currentVacation.start_date).toLocaleDateString('de-DE')} bis {new Date(currentVacation.end_date).toLocaleDateString('de-DE')}</strong>
                <p>{currentVacation.reason}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Announcements Banner */}
      {announcements && announcements.length > 0 && (
        <section className='announcements-section'>
          <div className='container'>
            {announcements.slice(0, 2).map((announcement: any) => (
              <div key={announcement.id} className='announcement-banner announcement-banner--info'>
                <div className='announcement-banner-content'>
                  <span className='announcement-icon'>📢</span>
                  <div>
                    <h3>{announcement.title}</h3>
                    <p>{announcement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Info Cards Grid */}
      <section className='home-section home-section--cards'>
        <div className='container'>
          <h2 className='section-title'>Unsere Services</h2>
          <div className='home-section-cards'>
            {/* Leistungen Card */}
            <Link href='/leistungen' className='home-info-card'>
              <div className='info-card-icon'>💼</div>
              <h3 className='info-card-title'>Leistungen</h3>
              <p className='info-card-text'>
                Entdecken Sie unser umfangreiches medizinisches Angebot
              </p>
            </Link>

            {/* Öffnungszeiten Card */}
            <div className='home-info-card'>
              <div className='info-card-icon'>🕒</div>
              <h3 className='info-card-title'>Öffnungszeiten</h3>
              <div className='opening-hours-list'>
                {openingHours && openingHours.length > 0 ? (
                  openingHours.slice(0, 5).map((hour: any, index: number) => {
                    const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
                    return (
                      <div key={hour.id} className='hours-item'>
                        <span className='hours-day'>{days[index] || `Tag ${index + 1}`}:</span>
                        <span className='hours-time'>
                          {hour.is_open 
                            ? `${hour.open_time || '-'} - ${hour.close_time || '-'}`
                            : 'Geschlossen'}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <p className='info-card-text'>Bitte kontaktieren Sie uns</p>
                )}
              </div>
            </div>

            {/* Kontakt Card */}
            <Link href='/kontakt' className='home-info-card'>
              <div className='info-card-icon'>📧</div>
              <h3 className='info-card-title'>Kontakt</h3>
              <p className='info-card-text'>
                Haben Sie Fragen? Schreiben Sie uns eine Nachricht
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <GoogleReviews />

      {/* CTA Section - Termin buchen */}
      <section className='home-section home-section--cta'>
        <div className='container'>
          <div className='cta-box'>
            <div className='cta-content'>
              <h2 className='cta-title'>Bereit für Ihren Termin?</h2>
              <p className='cta-text'>
                Buchen Sie jetzt online einen Termin oder kontaktieren Sie uns telefonisch
              </p>
            </div>
            <div className='cta-actions'>
              {/* 1. Primärer Button */}
              <BookingButton 
                  configId={medatixxId}
                  label="📅 Jetzt Termin buchen"
                  className="cta-button cta-button--primary cursor-pointer"
              />
              
              {/* 2. Sekundärer Button */}
              <Link href='/kontakt' className='cta-button cta-button--secondary'>
                📞 Kontakt
              </Link>

              {/* 3. WhatsApp Button */}
              <a 
                href="https://www.whatsapp.com/channel/0029VaCGpDb8vd1ITGPG800l" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button"
                style={{
                  backgroundColor: '#25D366', 
                  color: 'white', 
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Kanal abonnieren
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads/Documents Section */}
      <section className='home-section'>
        <div className='container'>
          <h2 className='section-title'>Patienteninformationen</h2>
          <div className='home-section-cards'>
            <Link href='/downloads' className='home-info-card'>
              <div className='info-card-icon'>📄</div>
              <h3 className='info-card-title'>Downloads</h3>
              <p className='info-card-text'>
                Formulare und Dokumente zum Download
              </p>
            </Link>

            <Link href='/praxis' className='home-info-card'>
              <div className='info-card-icon'>ℹ️</div>
              <h3 className='info-card-title'>Über die Praxis</h3>
              <p className='info-card-text'>
                Erfahren Sie mehr über uns und unser Team
              </p>
            </Link>

            <Link href='/datenschutz' className='home-info-card'>
              <div className='info-card-icon'>🔒</div>
              <h3 className='info-card-title'>Datenschutz</h3>
              <p className='info-card-text'>
                Informationen zum Schutz Ihrer Daten
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
