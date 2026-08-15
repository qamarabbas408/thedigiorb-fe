import { MetadataRoute } from 'next';
import apiClient from '@/lib/api/client';
import { teamMembers } from '@/data/teamMembers';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thedigiorb.com';

interface Project {
  id: string;
  slug: string;
  title: string;
  updated_at: string;
}

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
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
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
    ...teamMembers.map((member) => ({
      url: `${baseUrl}/team-member/${member.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    const response = await apiClient.get('/portfolio/projects', {
      params: { status: 'published' },
    });
    const projects: Project[] = response.data.data || response.data;
    
    dynamicPages = projects.map((project) => ({
      url: `${baseUrl}/portfolio/${project.id}`,
      lastModified: project.updated_at ? new Date(project.updated_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Failed to fetch projects for sitemap:', error);
  }

  return [...staticPages, ...dynamicPages];
}
