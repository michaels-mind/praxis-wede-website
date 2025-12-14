import { AdminLayout } from '../components/AdminLayout';
import { OpeningHoursList } from './OpeningHoursList';

export default function OpeningHoursPage() {
  return (
    <AdminLayout>
      <div className='page-header'>
        <h1 className='page-title'>Öffnungszeiten verwalten</h1>
      </div>

      <div className='info-box'>
        <p>💡 Bearbeiten Sie die Öffnungszeiten für jeden Wochentag. Änderungen werden sofort auf der Website sichtbar.</p>
      </div>

      <OpeningHoursList />
    </AdminLayout>
  );
}
