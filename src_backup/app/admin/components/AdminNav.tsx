import Link from 'next/link';

export function AdminNav() {
  return (
    <nav className='admin-nav'>
      <div className='admin-nav-header'>
        <h1 className='admin-title'>Admin Dashboard</h1>
      </div>
      <ul className='admin-nav-list'>
        <li><Link href='/admin'>Dashboard</Link></li>
        <li><Link href='/admin/announcements'>Ankündigungen</Link></li>
        <li><Link href='/admin/contact-messages'>Nachrichten</Link></li>
        <li><Link href='/admin/opening-hours'>Öffnungszeiten</Link></li>
        <li><Link href='/admin/vacations'>Urlaube</Link></li>
      </ul>
    </nav>
  );
}
