import { ReactNode } from 'react';
import { AdminNav } from './AdminNav';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className='admin-container'>
      <AdminNav />
      <main className='admin-main'>
        {children}
      </main>
    </div>
  );
}
