import type { Metadata } from "next";
import { JuniorsCourseClient } from "./JuniorsCourseClient";

const PAGE_URL = "https://thedigiorb.com/juniors-course";
const OG_IMAGE = "https://thedigiorb.com/assets/img/og-image.png";

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Juniors – Young Developer Course",
  description:
    "A practical introduction to technology, programming, web development, and problem-solving for young learners. Covers web & programming fundamentals, building web projects, modern development tools, AI-assisted development, and problem-solving through hands-on projects.",
  url: PAGE_URL,
  image: OG_IMAGE,
  provider: {
    "@type": "Organization",
    name: "TheDigiOrb",
    url: "https://thedigiorb.com",
  },
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  teaches: [
    "Web & programming fundamentals",
    "Building simple web projects",
    "Modern development tools",
    "AI-assisted development concepts",
    "Problem-solving like a developer",
  ],
  isAccessibleForFree: false,
  inLanguage: "en",
  keywords:
    "coding for kids, young developers, learn to code, web development, AI, tech education, programming",
};

export const metadata: Metadata = {
  title: "Juniors – Young Developer Course | TheDigiOrb",
  description:
    "Building Young Developers, One Idea at a Time! Learn web & programming fundamentals, build projects, and explore AI-assisted development with TheDigiOrb.",
  keywords: [
    "young developers",
    "coding for kids",
    "learn to code",
    "web development course",
    "kids coding",
    "tech education",
    "AI coding",
    "programming for kids",
    "future developers",
    "digital skills",
    "TheDigiOrb",
  ],
  openGraph: {
    title: "Juniors – Young Developer Course | TheDigiOrb",
    description:
      "Building Young Developers, One Idea at a Time! From curiosity to creativity. Learn to build, code, and think like a developer.",
    url: PAGE_URL,
    siteName: "TheDigiOrb",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "TheDigiOrb Juniors – Young Developer Course",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Juniors – Young Developer Course | TheDigiOrb",
    description:
      "Building Young Developers, One Idea at a Time! Join our hands-on course to learn coding, build projects, and become future developers.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: PAGE_URL,
  },
};

export default function JuniorsCoursePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <JuniorsCourseClient />
    </>
  );
}
