import type { Metadata } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import Preloader from '@/components/Preloader';
import PageTransition from '@/components/PageTransition';
import './globals.css';

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-barlow',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Scooter & Quad — Vive Cabo Verde',
  description:
    'Aluguer de scooters e quads, excursões guiadas e venda em Cabo Verde. À hora, ao dia ou à semana.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body
        className={`${barlow.variable} ${inter.variable} bg-paper font-body text-ink antialiased`}
      >
        <AuthProvider>
          <Preloader />
          <PageTransition />
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
