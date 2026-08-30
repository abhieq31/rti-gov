import type { Metadata } from 'next';
import './globals.css';
import './official-portal.css';
import './citizen-portal.css';
import './portal-v2.css';
import './redesign.css';
import { LanguageProvider } from '@/components/language-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://rti-gov.vercel.app'),
  title: {
    default: 'RTI Online prototype | File a Central request in one minute',
    template: '%s',
  },
  description: 'Independent citizen-first redesign of RTI Online: start with the record you want, file a Central request, and leave with a registration number and statutory due date.',
  applicationName: 'RTI Online prototype',
  authors: [{ name: 'RTI.gov independent concept team' }],
  creator: 'RTI.gov independent concept team',
  keywords: ['RTI', 'Right to Information Act', 'RTI request online', 'RTI status', 'RTI first appeal', 'public authority India'],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    title: 'RTI Online prototype | File a Central request in one minute',
    description: 'Independent redesign of India’s RTI Online service. Start with a sentence, not a ministry name.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RTI Online — Central Government Right to Information portal prototype' }],
    type: 'website',
    locale: 'en_IN',
    siteName: 'RTI Online prototype',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RTI Online prototype | File a Central request in one minute',
    description: 'Independent redesign of India’s RTI Online service. Start with a sentence, not a ministry name.',
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
      <body><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
