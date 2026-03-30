import { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  // TODO: Fetch from Laravel API for dynamic metadata
  // For now, return static metadata
  
  return {
    title: `Portfolio Project`,
    description: `View this project on our portfolio.`,
    alternates: {
      canonical: `/portfolio/${id}`,
    },
  };
}
