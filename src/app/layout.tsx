import type { Metadata } from "next";
import "./globals.css";
import Favicon from "@/components/Favicon";
import Script from "next/script";
import { SettingsProvider } from "@/context/SettingsContext";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  metadataBase: new URL('https://digitalorbit.org'),
  title: {
    default: "DigitalOrbit - Crafting Exceptional Digital Experiences",
    template: "%s | DigitalOrbit",
  },
  description: "DigitalOrbit - Building innovative web and mobile solutions for businesses worldwide. Expert web development, mobile apps, and digital transformation services.",
  keywords: ["digital agency", "web development", "mobile app development", "UI/UX design", "software solutions", "digital transformation", "React development", "Next.js development"],
  authors: [{ name: "DigitalOrbit" }],
  creator: "DigitalOrbit",
  publisher: "DigitalOrbit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://digitalorbit.org",
    siteName: "DigitalOrbit",
    title: "DigitalOrbit - Crafting Exceptional Digital Experiences",
    description: "Building innovative web and mobile solutions for businesses worldwide. Expert web development, mobile apps, and digital transformation services.",
    images: [
      {
        url: "/assets/img/og-image.png",
        width: 1200,
        height: 630,
        alt: "DigitalOrbit - Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DigitalOrbit - Crafting Exceptional Digital Experiences",
    description: "Building innovative web and mobile solutions for businesses worldwide.",
    images: ["/assets/img/og-image.png"],
    creator: "@digitalorbits",
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
    google: "google-site-verification-code",
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
        {/* Favicons */}
        <link href="/assets/img/favicon.png" rel="icon" />
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
      </body>
    </html>
  );
}