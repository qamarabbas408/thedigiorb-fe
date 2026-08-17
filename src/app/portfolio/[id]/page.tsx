import type { Metadata } from 'next';
import { projectsApi } from '@/lib/api';
import { processImageUrls } from '@/lib/api/utils';
import PortfolioDetailsClient from './PortfolioDetailsClient';
import JsonLd from '@/components/JsonLd';

interface PortfolioPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PortfolioPageProps): Promise<Metadata> {
  const { id } = await params;

  let title = 'Portfolio Project';
  let description = 'View this project on our portfolio.';
  let ogImage = undefined;

  try {
    const project = await projectsApi.getById(id);
    if (project) {
      title = project.title;
      if (project.subtitle) description = project.subtitle;
      if (project.description) description = project.description;
      const processed = processImageUrls(project, ['image']);
      if (processed.image) ogImage = processed.image;
    }
  } catch {
    // fall back to generic metadata if the API is unavailable
  }

  return {
    title,
    description,
    alternates: {
      canonical: `/portfolio/${id}`,
    },
    openGraph: ogImage
      ? {
          title,
          description,
          images: [ogImage],
        }
      : undefined,
  };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { id } = await params;

  let schemas: Record<string, unknown>[] = [];

  try {
    const project = await projectsApi.getById(id);
    if (project) {
      const processed = processImageUrls(project, ['image']);
      const projectUrl = `https://thedigiorb.com/portfolio/${id}`;

      schemas.push({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${projectUrl}#project`,
        name: project.title,
        description: project.description || project.subtitle,
        url: projectUrl,
        ...(processed.image ? { image: processed.image } : {}),
        ...(project.technologies?.length
          ? {
              keywords: project.technologies.join(", "),
            }
          : {}),
        ...(project.year ? { dateCreated: String(project.year) } : {}),
        creator: { "@id": "https://thedigiorb.com/#organization" },
      });

      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thedigiorb.com" },
          { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://thedigiorb.com/portfolio" },
          { "@type": "ListItem", position: 3, name: project.title, item: projectUrl },
        ],
      });
    }
  } catch {
    // structured data is optional; skip if the API is unavailable
  }

  return (
    <>
      {schemas.map((schema) => (
        <JsonLd key={schema["@type"] as string} data={schema} />
      ))}
      <PortfolioDetailsClient params={params} />
    </>
  );
}
