import type { Metadata } from "next";
import "./globals.css";
import Favicon from "@/components/Favicon";
import Script from "next/script";
import { SettingsProvider } from "@/context/SettingsContext";
import ClientLayout from "@/components/ClientLayout";
import { QueryProvider } from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  metadataBase: new URL('https://thedigiorb.com'),
  title: {
    default: "TheDiGiorb - Crafting Exceptional Digital Experiences",
    template: "%s | TheDiGiorb",
  },
  description: "TheDiGiorb - Professional IT solutions including web development, mobile apps, AI/LLMs, blockchain, and custom software. Serving national and international clients with 5+ years of experience.",
  keywords: ["web development", "mobile app development", "custom software", "AI solutions", "LLMs", "blockchain", "IT support", "digital agency", "software development", "TheDiGiorb"],
  authors: [{ name: "TheDiGiorb" }],
  creator: "TheDiGiorb",
  publisher: "TheDiGiorb",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thedigiorb.com",
    siteName: "TheDiGiorb",
    title: "TheDiGiorb - Crafting Exceptional Digital Experiences",
    description: "Professional IT solutions including web development, mobile apps, AI/LLMs, blockchain, and custom software. 5+ years of experience serving national and international clients.",
    images: [
      {
        url: "/assets/img/og-image.png",
        width: 1200,
        height: 630,
        alt: "TheDiGiorb - Crafting Exceptional Digital Experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheDiGiorb - Crafting Exceptional Digital Experiences",
    description: "Professional IT solutions including web development, mobile apps, AI/LLMs, blockchain, and custom software.",
    images: ["/assets/img/og-image.png"],
    creator: "@TheDiGiorb",
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
      { url: '/assets/img/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/img/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/img/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/img/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
        {/* Favicons */}
        <link href="/assets/img/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/assets/img/favicon-32x32.png" rel="icon" sizes="32x32" />
        <link href="/assets/img/favicon-16x16.png" rel="icon" sizes="16x16" />
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

        {/* Vendor CSS Files */}
        <link
          href="/assets/vendor/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link href="/assets/vendor/aos/aos.css" rel="stylesheet" />
        <link
          href="/assets/vendor/glightbox/css/glightbox.min.css"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/swiper/swiper-bundle.min.css"
          rel="stylesheet"
        />

        {/* Main CSS File */}
        <link href="/assets/css/main.css" rel="stylesheet" />

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

        {/* Scroll Top */}
        <a
          href="#"
          id="scroll-top"
          className="scroll-top d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-arrow-up-short"></i>
        </a>

        {/* Preloader */}
        <div id="preloader"></div>

        {/* Vendor JS Files */}
        <Script
          src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/vendor/php-email-form/validate.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/vendor/aos/aos.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/vendor/glightbox/js/glightbox.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/vendor/isotope-layout/isotope.pkgd.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/vendor/purecounter/purecounter_vanilla.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/vendor/swiper/swiper-bundle.min.js"
          strategy="afterInteractive"
        />

        {/* Main JS File */}
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
        </QueryProvider>
      </body>
    </html>
  );
}