import { useQuery } from '@tanstack/react-query';
import { servicesApi } from '@/lib/api';

export const usePublishedServices = () => {
  return useQuery({
    queryKey: ['services', 'published'],
    queryFn: () => servicesApi.getPublished(),
  });
};
