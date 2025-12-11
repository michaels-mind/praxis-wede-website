// src/app/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  getOpeningHours,
  getAnnouncements,
  getVacations,
} from '../lib/admin';



export const metadata: Metadata = {
  title: 'Praxis Andreas Wede â€“ Ihre Hausarztpraxis in Nienburg/Weser',
  description:
    'Hausarztpraxis Dr. Andreas Wede in Nienburg/Weser: Menschliche hausÃ¤rztliche Versorgung, lange Erfahrung, Suchtmedizin und persÃ¶nliche Betreuung.',
};

export default async function HomePage() {
  const [openingHours, announcements, allVacations] = await Promise.all([
    getOpeningHours(),
    getAnnouncements(),
    getVacations(),
  ]);

  // Filter aktive AnkÃ¼ndigungen (nur die mit isactive=true und innerhalb des Datums)
  const today = new Date().toISOString().split('T')[0];
  const activeAnnouncements = announcements.filter(
    (a) => a.isactive && a.startdate <= today && a.enddate >= today
  );

  // Filter aktive Urlaube (nur zukÃ¼nftige/aktuelle)
  const activeVacations = allVacations.filter(
    (v) => v.isactive && v.enddate >= today
  );

  const hasAnnouncements = activeAnnouncements.length > 0;
  const hasActiveVacations = activeVacations.length > 0;

  return (
    <div className="home-page">
      {/* Hero mit Bild */}
      <section aria-labelledby="home-intro-heading" className="home-hero home-hero-grid">
        <div className="home-hero-text-col">
          <h1 id="home-intro-heading" className="home-hero-title">
            Ihre Hausarztpraxis in Nienburg/Weser
          </h1>
          <p className="home-hero-text">
            In der Praxis von Dr. Andreas Wede stehen eine verlÃ¤ssliche
            hausÃ¤rztliche Versorgung, langjÃ¤hrige Erfahrung und eine persÃ¶nliche
            Betreuung im Mittelpunkt.
          </p>
          <p className="home-hero-text">
            Wir begleiten Sie und Ihre Familie bei akuten Beschwerden und
            chronischen Erkrankungen â€“ von der Vorsorge bis zur langfristigen
            Behandlung.
          </p>

          <div className="home-hero-actions">
            <a href="#sprechzeiten" className="hero-primary-link">
              Sprechzeiten & Kontakt
            </a>
            <a href="/leistungen" className="hero-secondary-link">
              Leistungen ansehen
            </a>
          </div>
        </div>

        <div className="home-hero-image-col">
          <Image
            src="/images/hero-praxis-wede.webp"
            alt="Heller Empfangsbereich einer Hausarztpraxis"
            fill
            className="home-hero-image"
            sizes="(min-width: 1024px) 480px, 100vw"
            priority
          />
        </div>
      </section>

      {/* Drei Info-Karten */}
      <section aria-label="Ãœberblick" className="home-section home-section-cards">
        <article className="home-info-card">
          <div className="home-info-card-icon">
            <Image
              src="/icons/icon-schedule.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
            />
          </div>
          <h2 className="home-info-card-title">Sprechzeiten</h2>
          <p className="home-info-card-text">
            Aktuelle Sprechzeiten und Hinweise zu Terminvereinbarungen finden Sie
            weiter unten auf dieser Seite.
          </p>
          <a href="#sprechzeiten" className="home-contact-link">
            Zu den Sprechzeiten
          </a>
        </article>

        <article className="home-info-card">
          <div className="home-info-card-icon">
            <Image
              src="/icons/icon-services.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
            />
          </div>
          <h2 className="home-info-card-title">Leistungen</h2>
          <p className="home-info-card-text">
            HausÃ¤rztliche Versorgung, Vorsorge, Suchtmedizin und
            palliativmedizinische Betreuung â€“ kompakt erklÃ¤rt.
          </p>
          <a href="/leistungen" className="home-contact-link">
            Leistungen ansehen
          </a>
        </article>

        <article className="home-info-card">
          <div className="home-info-card-icon">
            <Image
              src="/icons/icon-clinic.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
            />
          </div>
          <h2 className="home-info-card-title">Anfahrt</h2>
          <p className="home-info-card-text">
            Adresse, Lage und Hinweise zur Erreichbarkeit der Praxis in
            Nienburg/Weser.
          </p>
          <a href="/praxis" className="home-contact-link">
            Zur Praxis-Seite
          </a>
        </article>
      </section>

      {/* Aktuelle Hinweise */}
      {hasAnnouncements && (
        <section
          aria-labelledby="announcements-heading"
          className="home-section home-section-accent"
        >
          <h2 id="announcements-heading" className="home-section-title">
            Aktuelle Hinweise
          </h2>
          <ul className="announcement-list">
            {activeAnnouncements.map((item) => (
              <li key={item.id} className="announcement-item">
                <h3 className="announcement-title">{item.title}</h3>
                <p className="announcement-content">{item.content}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Urlaubszeiten und Vertretung */}
      {hasActiveVacations && (
        <section
          aria-labelledby="vacations-heading"
          className="home-section home-section-warning"
        >
          <h2 id="vacations-heading" className="home-section-title">
            Urlaubszeiten und Vertretung
          </h2>
          <ul className="vacation-list">
            {activeVacations.map((vacation) => (
              <li key={vacation.id} className="vacation-item">
                <p className="vacation-title">
                  {vacation.description || 'Praxis geschlossen'}
                </p>
                <p className="vacation-dates">
                  {vacation.startdate} bis {vacation.enddate}
                </p>
                {vacation.emergencycontact && (
                  <p className="vacation-notes">{vacation.emergencycontact}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Sprechzeiten + Kontakt */}
      <section
        id="sprechzeiten"
        aria-labelledby="opening-hours-heading"
        className="home-section home-section-columns"
      >
        <div>
          <h2 id="opening-hours-heading" className="home-section-title">
            Sprechzeiten
          </h2>
          <p className="home-note">
            Bitte vereinbaren Sie Ihre Termine mÃ¶glichst telefonisch. So kÃ¶nnen
            wir Wartezeiten besser planen und Ihnen genÃ¼gend Zeit einrÃ¤umen.
          </p>

          <table className="opening-hours-table">
            <thead>
              <tr>
                <th scope="col">Tag</th>
                <th scope="col">Vormittag</th>
                <th scope="col">Nachmittag</th>
              </tr>
            </thead>
            <tbody>
              {openingHours.map((row) => {
                const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
                return (
                  <tr key={row.id}>
                    <th scope="row">{days[row.dayofweek]}</th>
                    <td>
                      {row.isclosed || !row.morningstart || !row.morningend
                        ? 'â€“'
                        : `${row.morningstart.slice(0, 5)}â€“${row.morningend.slice(0, 5)}`}
                    </td>
                    <td>
                      {row.isclosed || !row.afternoonstart || !row.afternoonend
                        ? 'â€“'
                        : `${row.afternoonstart.slice(0, 5)}â€“${row.afternoonend.slice(0, 5)}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <p className="home-note">
            In dringenden FÃ¤llen melden Sie sich bitte telefonisch, damit wir
            gemeinsam das weitere Vorgehen abstimmen kÃ¶nnen.
          </p>
        </div>

        <div className="home-contact-card">
          <h2 className="home-section-title">Kontakt und NotfÃ¤lle</h2>
          <p>
            Telefon:{' '}
            <a href="tel:+495021000000" className="home-contact-link">
              +49 (0)5021 000000
            </a>
          </p>
          <p>
            Adresse:
            <br />
            XYZ-StraÃŸe 1
            <br />
            31582 Nienburg/Weser
          </p>
          <p>
            FÃ¼r nicht dringende Anfragen kÃ¶nnen Sie auch unsere{' '}
            <a href="/kontakt" className="home-contact-link">
              Kontaktseite
            </a>{' '}
            nutzen.
          </p>
          <p className="home-note">
            In lebensbedrohlichen NotfÃ¤llen wÃ¤hlen Sie bitte den Notruf 112.
            AuÃŸerhalb unserer Sprechzeiten erreichen Sie den Ã¤rztlichen
            Bereitschaftsdienst unter der Telefonnummer 116 117.
          </p>
        </div>
      </section>
    </div>
  );
}
