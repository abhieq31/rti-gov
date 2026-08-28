import type { Metadata } from 'next';
import './globals.css';
import './official-portal.css';
import './citizen-portal.css';
import './portal-v2.css';
import './redesign.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://rti-gov-india.abhipatel33360.chatgpt.site'),
  title: {
    default: 'RTI Online | Submit Request, First Appeal and View Status',
    template: '%s',
  },
  description: 'A clear, citizen-first redesign of India’s RTI Online service for filing, tracking and appealing Central Government information requests.',
  applicationName: 'RTI Online prototype',
  authors: [{ name: 'RTI.gov independent concept team' }],
  creator: 'RTI.gov independent concept team',
  keywords: ['RTI', 'Right to Information Act', 'RTI request online', 'RTI status', 'RTI first appeal', 'public authority India'],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    title: 'RTI Online | Submit Request, First Appeal and View Status',
    description: 'File RTI applications and first appeals online for Central Government public authorities.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RTI Online — Central Government Right to Information portal prototype' }],
    type: 'website',
    locale: 'en_IN',
    siteName: 'RTI Online prototype',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RTI Online | Submit Request, First Appeal and View Status',
    description: 'File RTI applications and first appeals online for Central Government public authorities.',
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
