import { AdminLayout } from '../components/AdminLayout';
import { ContactMessagesList } from './ContactMessagesList';

export default function ContactMessagesPage() {
  return (
    <AdminLayout>
      <div className='page-header'>
        <h1 className='page-title'>Kontaktnachrichten</h1>
      </div>

      <div className='info-box'>
        <p>💡 <strong>Workflow:</strong> Neue Nachricht → Gelesen → Beantwortet → Archiviert</p>
      </div>

      <ContactMessagesList />
    </AdminLayout>
  );
}
