import type { Metadata } from "next";
import "./globals.css";
import Favicon from "@/components/Favicon";
import Script from "next/script";
import { SettingsProvider } from "@/context/SettingsContext";
import ClientLayout from "@/components/ClientLayout";
import { QueryProvider } from "@/components/providers/QueryProvider";
import JsonLd from "@/components/JsonLd";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "TheDigiOrb",
  url: "https://thedigiorb.com",
  logo: "https://thedigiorb.com/assets/img/nav-logo.png",
  description:
    "Professional IT solutions including web development, mobile apps, AI/LLMs, blockchain, and custom software. 5+ years of experience serving national and international clients.",
  email: "support@thedigiorb.com",
  telephone: "+923111588908",
  address: {
    "@type": "PostalAddress",
    addressCountry: "PK",
  },
  sameAs: [
    "https://www.facebook.com/people/Thedigiorb/61572018711437/?sk=about",
  ],
  areaServed: "Worldwide",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://thedigiorb.com'),
  title: {
    default: "TheDigiOrb - Crafting Exceptional Digital Experiences",
    template: "%s | TheDigiOrb",
  },
  description: "TheDigiOrb - Professional IT solutions including web development, mobile apps, AI/LLMs, blockchain, and custom software. Serving national and international clients with 5+ years of experience.",
  keywords: ["web development", "mobile app development", "custom software", "AI solutions", "LLMs", "blockchain", "IT support", "digital agency", "software development", "TheDigiOrb"],
  authors: [{ name: "TheDigiOrb" }],
  creator: "TheDigiOrb",
  publisher: "TheDigiOrb",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thedigiorb.com",
    siteName: "TheDigiOrb",
    title: "TheDigiOrb - Crafting Exceptional Digital Experiences",
    description: "Professional IT solutions including web development, mobile apps, AI/LLMs, blockchain, and custom software. 5+ years of experience serving national and international clients.",
    images: [
      {
        url: "https://thedigiorb.com/assets/img/og-image.png",
        width: 1200,
        height: 630,
        alt: "TheDigiOrb - Crafting Exceptional Digital Experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheDigiOrb - Crafting Exceptional Digital Experiences",
    description: "Professional IT solutions including web development, mobile apps, AI/LLMs, blockchain, and custom software.",
    images: ["https://thedigiorb.com/assets/img/og-image.png"],
    creator: "@TheDigiOrb",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "KmPsUCyuoXhJDuuCNdBicXb0YHsSVMetTyxpPhwSN1M",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/assets/img/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/img/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/assets/img/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
        {/* Favicon */}
        <link href="/favicon.ico" rel="icon" />
        <link href="/assets/img/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/assets/img/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/assets/img/apple-touch-icon.png" rel="apple-touch-icon" />

        {/* Fonts */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          href="https://fonts.gstatic.com"
          rel="preconnect"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />

        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-HK10748610" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HK10748610');
          `}
        </Script>

        <SettingsProvider>
          <Favicon />
          <ClientLayout>{children}</ClientLayout>
        </SettingsProvider>

        <JsonLd data={organizationSchema} />
        </QueryProvider>
      </body>
    </html>
  );
}