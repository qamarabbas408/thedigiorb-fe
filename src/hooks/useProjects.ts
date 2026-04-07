import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '@/lib/api';
import { Project } from '@/lib/api/types';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsApi.getAll(),
  });
};

export const usePublishedProjects = (limit?: number, offset?: number) => {
  return useQuery({
    queryKey: ['projects', 'published', limit, offset],
    queryFn: () => projectsApi.getPublished(limit, offset),
  });
};

export const usePublishedProjectsWithTotal = (limit: number = 12, offset: number = 0, categoryId?: string) => {
  return useQuery<{ projects: Project[]; total: number }>({
    queryKey: ['projects', 'published', 'paginated', limit, offset, categoryId],
    queryFn: () => projectsApi.getPublishedWithTotal(limit, offset, categoryId),
  });
};

export const useAllPublishedProjects = () => {
  return useQuery({
    queryKey: ['projects', 'published', 'all'],
    queryFn: () => projectsApi.getPublished(),
  });
};

export const useProjectById = (id: string | number) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsApi.getById(id),
    enabled: !!id,
  });
};

export const useProjectsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['projects', 'category', categoryId],
    queryFn: () => projectsApi.getByCategory(categoryId),
    enabled: !!categoryId,
  });
};

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: () => projectsApi.getFeatured(),
  });
};
