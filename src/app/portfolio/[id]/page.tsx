import type { Metadata } from 'next';
import { projectsApi } from '@/lib/api';
import { processImageUrls } from '@/lib/api/utils';
import PortfolioDetailsClient from './PortfolioDetailsClient';

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

export default function PortfolioPage({ params }: PortfolioPageProps) {
  return <PortfolioDetailsClient params={params} />;
}
