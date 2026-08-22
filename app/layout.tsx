import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rti-gov.vercel.app'),
  title: {
    default: 'RTI.gov — Right to Information for every citizen',
    template: '%s',
  },
  description: 'A citizen-first concept for India’s unified Right to Information service: learn, search, file, track and appeal.',
  applicationName: 'RTI.gov',
  authors: [{ name: 'RTI.gov independent concept team' }],
  creator: 'RTI.gov independent concept team',
  keywords: ['RTI', 'Right to Information Act', 'RTI request online', 'RTI status', 'RTI first appeal', 'public authority India'],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    title: 'RTI.gov — Information is your right',
    description: 'Learn, search, create, track and appeal through one citizen-first RTI service.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RTI.gov — Information is your right' }],
    type: 'website',
    locale: 'en_IN',
    siteName: 'RTI.gov',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RTI.gov — Information is your right',
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
