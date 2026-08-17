import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { projectsApi } from '@/lib/api';
import { Project } from '@/lib/api/types';

export const usePublishedProjects = (limit?: number, offset?: number, categoryId?: string) => {
  return useQuery({
    queryKey: ['projects', 'published', limit, offset, categoryId],
    queryFn: () => projectsApi.getPublished(limit, offset, categoryId),
    placeholderData: keepPreviousData,
  });
};

export const usePublishedProjectsWithTotal = (limit: number = 12, offset: number = 0, categoryId?: string) => {
  return useQuery<{ projects: Project[]; total: number }>({
    queryKey: ['projects', 'published', 'paginated', limit, offset, categoryId],
    queryFn: () => projectsApi.getPublishedWithTotal(limit, offset, categoryId),
  });
};