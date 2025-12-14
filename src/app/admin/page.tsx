import Link from 'next/link';
import { AdminLayout } from './components/AdminLayout';
import { StatCard } from './components/StatCard';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className='page-title'>Dashboard</h1>
      
      <div className='admin-stats-grid'>
        <Link href='/admin/contact-messages' className='stat-card-link'>
          <StatCard 
            title='Neue Nachrichten' 
            value={12} 
            icon='📧' 
            color='primary' 
          />
        </Link>
        
        <Link href='/admin/announcements' className='stat-card-link'>
          <StatCard 
            title='Ankündigungen' 
            value={3} 
            icon='📢' 
            color='accent' 
          />
        </Link>
        
        <Link href='/admin/opening-hours' className='stat-card-link'>
          <StatCard 
            title='Öffnungszeiten' 
            value={7} 
            icon='🕒' 
            color='success' 
          />
        </Link>
        
        <Link href='/admin/vacations' className='stat-card-link'>
          <StatCard 
            title='Urlaube' 
            value={2} 
            icon='🏖️' 
            color='warning' 
          />
        </Link>
      </div>
    </AdminLayout>
  );
}
