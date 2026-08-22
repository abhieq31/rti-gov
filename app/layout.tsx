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
  title: 'RTI.gov — Right to Information for every citizen',
  description: 'A concept for India’s unified Right to Information service: learn, search, create, track and appeal.',
  openGraph: {
    title: 'RTI.gov — Information is your right',
    description: 'Learn, search, create, track and appeal through one citizen-first RTI service.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RTI.gov — Information is your right' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RTI.gov — Information is your right',
    description: 'Learn, search, create, track and appeal through one citizen-first RTI service.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
