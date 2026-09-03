import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PONT — Kinetic Manifesto',
  description: "A kinetic manifesto for Europe's physical future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
