import { createClient } from '../../lib/supabaseClient';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getDashboardData() {
  const supabase = createClient();

  const [announcements, vacations, messages] = await Promise.all([
    supabase.from('announcements').select('*').eq('isactive', true),
    supabase.from('vacations').select('*').eq('isactive', true).gte('enddate', new Date().toISOString()),
    supabase.from('contactmessages').select('*').eq('is_read', false).limit(5),
  ]);

  return {
    activeAnnouncements: announcements.data || [],
    upcomingVacations: vacations.data || [],
    unreadMessages: messages.data || [],
  };
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  return (
    <div className="admin-container">
      {/* Header Bereich */}
      <header className="admin-header">
        <div className="admin-header__content">
          <div>
            <h1>Dashboard</h1>
            <p>Willkommen zurück im Admin-Bereich.</p>
          </div>
          <div className="admin-header__actions">
            <Link 
              href="/" 
              target="_blank"
              className="btn btn--secondary"
            >
              <span>Website öffnen</span>
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Admin-Subnavigation */}
      <nav className="admin-nav">
        <div className="admin-nav__tabs">
          <NavTab href="/admin" label="Dashboard" active />
          <NavTab href="/admin/announcements" label="Ankündigungen" />
          <NavTab href="/admin/contact-messages" label="Nachrichten" badge={data.unreadMessages.length > 0 ? data.unreadMessages.length : undefined} />
          <NavTab href="/admin/opening-hours" label="Sprechzeiten" />
          <NavTab href="/admin/vacations" label="Urlaube" />
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="admin-stats-grid">
        <StatCard
          label="Ungelesene Nachrichten"
          value={data.unreadMessages.length}
          href="/admin/contact-messages"
          color="blue"
          badge={data.unreadMessages.length > 0 ? "Neu" : undefined}
          icon={
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard
          label="Aktive Ankündigungen"
          value={data.activeAnnouncements.length}
          href="/admin/announcements"
          color="green"
          icon={
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          }
        />
        <StatCard
          label="Kommende Urlaube"
          value={data.upcomingVacations.length}
          href="/admin/vacations"
          color="orange"
          icon={
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
      </div>

      <div className="admin-content-grid">
        {/* Schnellzugriff */}
        <section className="admin-panel">
          <div className="admin-panel__header">
            <h2 className="admin-section-heading">Verwaltung</h2>
          </div>
          <div className="admin-menu">
            <MenuLink href="/admin/announcements" title="Ankündigungen" desc="Hinweise & News verwalten" />
            <MenuLink href="/admin/vacations" title="Urlaube" desc="Abwesenheiten eintragen" />
            <MenuLink href="/admin/opening-hours" title="Sprechzeiten" desc="Öffnungszeiten bearbeiten" />
            <MenuLink href="/admin/contact-messages" title="Nachrichten" desc="Patienten-Anfragen lesen" />
          </div>
        </section>

        {/* Letzte Nachrichten Preview */}
        <section className="admin-panel">
          <div className="admin-panel__header admin-panel__header--with-action">
            <h2 className="admin-section-heading">Neueste Nachrichten</h2>
            <Link href="/admin/contact-messages" className="link link--primary">Alle ansehen</Link>
          </div>
          <div className="admin-messages-list">
            {data.unreadMessages.length === 0 ? (
              <div className="empty-state">Keine ungelesenen Nachrichten</div>
            ) : (
              data.unreadMessages.map((msg: any) => (
                <div key={msg.id} className="message-item">
                  <div className="message-item__header">
                    <div className="message-item__name-wrapper">
                      <span className="message-item__name">{msg.name}</span>
                      <span className="badge badge--new">Neu</span>
                    </div>
                    <span className="message-item__date">
                      {new Date(msg.created_at).toLocaleDateString('de-DE')}
                    </span>
                  </div>
                  <p className="message-item__text">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Kommende Urlaube */}
        <section className="admin-panel">
          <div className="admin-panel__header admin-panel__header--with-action">
            <h2 className="admin-section-heading">Kommende Urlaube</h2>
            <Link href="/admin/vacations" className="link link--warning">Alle ansehen</Link>
          </div>
          <div className="admin-panel__content">
            {data.upcomingVacations.length === 0 ? (
              <div className="empty-state">Keine kommenden Urlaube</div>
            ) : (
              <div className="vacation-list">
                {data.upcomingVacations.slice(0, 3).map((vacation: any) => (
                  <div key={vacation.id} className="vacation-item">
                    <div className="vacation-item__title">
                      {vacation.description || 'Urlaub'}
                    </div>
                    <div className="vacation-item__date">
                      <svg className="icon icon--sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(vacation.startdate).toLocaleDateString('de-DE')} - {new Date(vacation.enddate).toLocaleDateString('de-DE')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

// Typdefinitionen
interface StatCardProps {
  label: string;
  value: number;
  href: string;
  color: 'blue' | 'green' | 'orange';
  icon: React.ReactNode;
  badge?: string;
}

interface NavTabProps {
  href: string;
  label: string;
  active?: boolean;
  badge?: number;
}

interface MenuLinkProps {
  href: string;
  title: string;
  desc: string;
}

function StatCard({ label, value, href, color, icon, badge }: StatCardProps) {
  const colorClass = `admin-stat-card__icon--${color}`;
  
  return (
    <Link href={href} className="admin-stat-card">
      <div className={`admin-stat-card__icon ${colorClass}`}>
        {icon}
      </div>
      <div className="admin-stat-card__content">
        <div className="admin-stat-card__value">{value}</div>
        <div className="admin-stat-card__label">{label}</div>
      </div>
      {badge && (
        <span className="badge badge--alert">
          {badge}
        </span>
      )}
    </Link>
  );
}

function NavTab({ href, label, active = false, badge }: NavTabProps) {
  return (
    <Link 
      href={href}
      className={`admin-nav__tab ${active ? 'admin-nav__tab--active' : ''}`}
    >
      {label}
      {badge !== undefined && badge > 0 && (
        <span className="badge badge--count">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </Link>
  );
}

function MenuLink({ href, title, desc }: MenuLinkProps) {
  return (
    <Link href={href} className="menu-link">
      <span className="menu-link__title">{title}</span>
      <span className="menu-link__desc">{desc}</span>
    </Link>
  );
}
