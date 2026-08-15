import { Metadata } from 'next';
import RevampLandingPage from '@/components/revamp/LandingPage';

export const metadata: Metadata = {
  title: 'Crafting Exceptional Digital Experiences',
  description: 'Building innovative web and mobile solutions for businesses worldwide. Expert web development, mobile apps, and digital transformation services.',
  openGraph: {
    title: 'Crafting Exceptional Digital Experiences',
    description: 'Building innovative web and mobile solutions for businesses worldwide. Expert web development, mobile apps, and digital transformation services.',
    url: 'https://thedigiorb.com',
    siteName: 'TheDigiOrb',
    images: [
      {
        url: 'https://thedigiorb.com/assets/img/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TheDigiOrb - Digital Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crafting Exceptional Digital Experiences',
    description: 'Building innovative web and mobile solutions for businesses worldwide.',
    images: ['https://thedigiorb.com/assets/img/og-image.png'],
  },
  alternates: {
    canonical: 'https://thedigiorb.com',
  },
};

export default function HomePage() {
  return <RevampLandingPage />;
}