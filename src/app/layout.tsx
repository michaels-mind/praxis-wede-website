import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-blue-50/30 font-sans text-gray-900 antialiased flex flex-col">
        {children}
      </body>
    </html>
  )
}
