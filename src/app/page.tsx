import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import WhyUs from '@/components/sections/WhyUs';
import Testimonials from '@/components/sections/Testimonials';
import Team from '@/components/sections/Team';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'TheDigiOrb - Crafting Exceptional Digital Experiences',
  description: 'Building innovative web and mobile solutions for businesses worldwide. Expert web development, mobile apps, and digital transformation services.',
  openGraph: {
    title: 'TheDigiOrb - Crafting Exceptional Digital Experiences',
    description: 'Building innovative web and mobile solutions for businesses worldwide. Expert web development, mobile apps, and digital transformation services.',
    url: 'https://thedigiorb.com',
    siteName: 'TheDigiOrb',
    images: [
      {
        url: '/assets/img/og-image.png',
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
    title: 'TheDigiOrb - Crafting Exceptional Digital Experiences',
    description: 'Building innovative web and mobile solutions for businesses worldwide.',
    images: ['/assets/img/og-image.png'],
  },
  alternates: {
    canonical: 'https://thedigiorb.com',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <WhyUs />
      <Testimonials />
      <Team />
      <Contact />
    </>
  );
}