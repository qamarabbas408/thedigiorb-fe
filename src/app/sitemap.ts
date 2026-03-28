import { MetadataRoute } from 'next';
import pool from '@/lib/db';

const SITE_URL = 'https://digitalorbit.org';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio-details`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service-details`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/starter-page`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    const [projects] = await pool.query(
      'SELECT id, updated_at FROM projects WHERE status = ? ORDER BY updated_at DESC',
      ['published']
    ) as [any[], any];

    const projectPages = (projects as any[]).map((project) => ({
      url: `${baseUrl}/portfolio/${project.id}`,
      lastModified: new Date(project.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    dynamicPages = [...dynamicPages, ...projectPages];
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error);
  }

  return [...staticPages, ...dynamicPages];
}
