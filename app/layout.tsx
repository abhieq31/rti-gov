import type { Metadata } from 'next';
import './globals.css';
import './official-portal.css';
import './citizen-portal.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://rti-gov.vercel.app'),
  title: {
    default: 'RTI Online — Right to Information citizen services',
    template: '%s',
  },
  description: 'A citizen-first concept for India’s unified Right to Information service: learn, search, file, track and appeal.',
  applicationName: 'RTI Online prototype',
  authors: [{ name: 'RTI.gov independent concept team' }],
  creator: 'RTI.gov independent concept team',
  keywords: ['RTI', 'Right to Information Act', 'RTI request online', 'RTI status', 'RTI first appeal', 'public authority India'],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    title: 'RTI Online — Information is your right',
    description: 'Learn, search, create, track and appeal through one citizen-first RTI service.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RTI.gov — Information is your right' }],
    type: 'website',
    locale: 'en_IN',
    siteName: 'RTI Online prototype',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RTI Online — Information is your right',
    description: 'Learn, search, create, track and appeal through one citizen-first RTI service.',
    images: ['/og.png'],
  },
  category: 'government services',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
