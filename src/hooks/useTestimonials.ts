import { useQuery } from '@tanstack/react-query';
import { testimonialsApi } from '@/lib/api';

export const usePublishedTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials', 'published'],
    queryFn: () => testimonialsApi.getPublished(),
  });
};