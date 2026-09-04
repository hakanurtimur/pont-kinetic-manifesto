import type { Metadata } from 'next';
import Script from 'next/script';
import { APPEARANCE_BOOTSTRAP_SCRIPT } from '@/src/lib/theme.mjs';
import './globals.css';

const title = 'PONT — Building Europe’s Physical Future';
const description = "Building the physical infrastructure for Europe’s next technological era across Physical AI, Life Sciences, capital, community and academy.";

export const metadata: Metadata = {
  metadataBase: new URL('https://pont-amsterdam.vercel.app'),
  title,
  description,
  applicationName: 'PONT',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'PONT',
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Script
          id="pont-appearance-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: APPEARANCE_BOOTSTRAP_SCRIPT }}
        />
      </body>
    </html>
  );
}
