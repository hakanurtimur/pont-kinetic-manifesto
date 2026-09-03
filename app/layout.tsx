import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PONT — Building Europe’s Physical Future',
  description: "Building the physical infrastructure for Europe’s next technological era across Physical AI, Life Sciences, capital, community and education.",
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
