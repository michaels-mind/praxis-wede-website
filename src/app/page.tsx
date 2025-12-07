// src/app/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  getOpeningHours,
  getAnnouncements,
  getActiveVacations,
} from './lib/queries';
import { formatTime, getWeekdayName } from './lib/utils';

export const metadata: Metadata = {
  title: 'Praxis Andreas Wede – Ihre Hausarztpraxis in Nienburg/Weser',
  description:
    'Hausarztpraxis Dr. Andreas Wede in Nienburg/Weser: Menschliche hausärztliche Versorgung, lange Erfahrung, Suchtmedizin und persönliche Betreuung.',
};

export default async function HomePage() {
  const [openingHours, announcements, activeVacations] = await Promise.all([
    getOpeningHours(),
    getAnnouncements(),
    getActiveVacations(),
  ]);

  const hasAnnouncements = announcements.length > 0;
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
            In der Praxis von Dr. Andreas Wede stehen eine verlässliche
            hausärztliche Versorgung, langjährige Erfahrung und eine persönliche
            Betreuung im Mittelpunkt.
          </p>
          <p className="home-hero-text">
            Wir begleiten Sie und Ihre Familie bei akuten Beschwerden und
            chronischen Erkrankungen – von der Vorsorge bis zur langfristigen
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
      <section aria-label="Überblick" className="home-section home-section-cards">
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
            Hausärztliche Versorgung, Vorsorge, Suchtmedizin und
            palliativmedizinische Betreuung – kompakt erklärt.
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
            {announcements.map((item) => (
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
                <p className="vacation-title">{vacation.title}</p>
                <p className="vacation-dates">
                  {vacation.start_date} bis {vacation.end_date}
                </p>
                {vacation.notes && (
                  <p className="vacation-notes">{vacation.notes}</p>
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
            Bitte vereinbaren Sie Ihre Termine möglichst telefonisch. So können
            wir Wartezeiten besser planen und Ihnen genügend Zeit einräumen.
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
              {openingHours.map((row) => (
                <tr key={row.id}>
                  <th scope="row">{getWeekdayName(row.weekday)}</th>
                  <td>
                    {row.is_closed || !row.morning_from || !row.morning_to
                      ? '–'
                      : `${formatTime(row.morning_from)}–${formatTime(
                          row.morning_to,
                        )}`}
                  </td>
                  <td>
                    {row.is_closed || !row.afternoon_from || !row.afternoon_to
                      ? '–'
                      : `${formatTime(row.afternoon_from)}–${formatTime(
                          row.afternoon_to,
                        )}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="home-note">
            In dringenden Fällen melden Sie sich bitte telefonisch, damit wir
            gemeinsam das weitere Vorgehen abstimmen können.
          </p>
        </div>

        <div className="home-contact-card">
          <h2 className="home-section-title">Kontakt und Notfälle</h2>
          <p>
            Telefon:{' '}
            <a href="tel:+495021000000" className="home-contact-link">
              +49 (0)5021 000000
            </a>
          </p>
          <p>
            Adresse:
            <br />
            XYZ-Straße 1
            <br />
            31582 Nienburg/Weser
          </p>
          <p>
            Für nicht dringende Anfragen können Sie auch unsere{' '}
            <a href="/kontakt" className="home-contact-link">
              Kontaktseite
            </a>{' '}
            nutzen.
          </p>
          <p className="home-note">
            In lebensbedrohlichen Notfällen wählen Sie bitte den Notruf 112.
            Außerhalb unserer Sprechzeiten erreichen Sie den ärztlichen
            Bereitschaftsdienst unter der Telefonnummer 116 117.
          </p>
        </div>
      </section>
    </div>
  );
}
