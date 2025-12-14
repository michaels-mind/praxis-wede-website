import Link from 'next/link';
import { getAnnouncements, getOpeningHours, getVacations } from '@/lib/admin';
import BookingButton from '@/components/medatixx/BookingButton'; // Import der Komponente

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
                  className="hero-primary-link cursor-pointer" // Nutzt Ihre existierende CSS-Klasse
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
              {/* MEDATIXX INTEGRATION: Sekundärer Button */}
              <BookingButton 
                  configId={medatixxId}
                  label="📅 Jetzt Termin buchen"
                  className="cta-button cta-button--primary cursor-pointer"
              />
              
              <Link href='/kontakt' className='cta-button cta-button--secondary'>
                📞 Kontakt aufnehmen
              </Link>
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
