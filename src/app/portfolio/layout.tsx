import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio - Our Projects & Work | DigitalOrbit',
  description: 'Explore our portfolio of innovative web and mobile solutions. View our successful projects in web development, mobile apps, UI/UX design, and more.',
  openGraph: {
    title: 'Portfolio - Our Projects & Work | DigitalOrbit',
    description: 'Explore our portfolio of innovative web and mobile solutions. View our successful projects in web development, mobile apps, UI/UX design, and more.',
    url: 'https://thedigiorb.com/portfolio',
    siteName: 'DigitalOrbit',
    type: 'website',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}