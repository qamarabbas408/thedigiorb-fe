import { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Team Member`,
    description: `View this team member's profile.`,
    alternates: {
      canonical: `/team-member/${id}`,
    },
  };
}
