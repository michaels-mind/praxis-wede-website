// app/admin/layout.tsx
import type { ReactNode } from 'react';
import '../globals.css'; // Pfad ggf. anpassen

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 font-sans text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
