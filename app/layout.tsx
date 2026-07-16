import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Amritsar is Live — Celebrating the Heart of the Holy City',
  description:
    'Discover Amritsar like never before. Explore monuments, savor legendary food, and experience the soul of the golden city.',
  keywords: ['Amritsar', 'Golden Temple', 'Punjab', 'Tourism', 'Amritsar is Live'],
  verification: {
    google: 'tBHUoFJpDQqmnOA4c9uZbTE7HkoI0VJq-P3z4p5JWKI',
  },
  openGraph: {
    title: 'Amritsar is Live',
    description: 'Celebrating the heartbeat of the holy city.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
