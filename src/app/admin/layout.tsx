// src/app/admin/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin – Praxis Andreas Wede',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main aria-labelledby="admin-heading" className="site-main admin-main">
      <div className="page-container">
        {children}
      </div>
    </main>
  );
}
