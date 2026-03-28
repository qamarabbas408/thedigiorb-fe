import { Metadata } from 'next';
import pool from '@/lib/db';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const [rows] = await pool.query(
      'SELECT title, subtitle, description, image FROM projects WHERE id = ? AND status = ?',
      [id, 'published']
    ) as [any[], any];
    
    const project = rows[0];
    
    if (project) {
      return {
        title: project.title,
        description: project.description?.substring(0, 160) || project.subtitle || `View project ${project.title}`,
        openGraph: {
          title: project.title,
          description: project.description?.substring(0, 160) || project.subtitle || `View project ${project.title}`,
          type: 'article',
          images: project.image ? [
            {
              url: project.image,
              width: 1200,
              height: 630,
              alt: project.title,
            }
          ] : [],
        },
        alternates: {
          canonical: `/portfolio/${id}`,
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata for portfolio:', error);
  }
  
  return {
    title: 'Portfolio',
    description: 'Explore our portfolio of successful projects.',
    alternates: {
      canonical: '/portfolio',
    },
  };
}
