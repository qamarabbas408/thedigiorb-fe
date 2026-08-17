import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio - Our Projects & Work',
  description: 'Explore our portfolio of innovative web and mobile solutions. View our successful projects in web development, mobile apps, UI/UX design, and more.',
  alternates: {
    canonical: 'https://thedigiorb.com/portfolio',
  },
  openGraph: {
    title: 'Portfolio - Our Projects & Work',
    description: 'Explore our portfolio of innovative web and mobile solutions. View our successful projects in web development, mobile apps, UI/UX design, and more.',
    url: 'https://thedigiorb.com/portfolio',
    siteName: 'TheDigiOrb',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://thedigiorb.com/assets/img/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TheDigiOrb - Digital Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Our Projects & Work',
    description: 'Explore our portfolio of innovative web and mobile solutions.',
    images: ['https://thedigiorb.com/assets/img/og-image.png'],
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}