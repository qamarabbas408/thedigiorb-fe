import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@/lib/api';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getAll(),
  });
};

export const useCategoryById = (id: string) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoriesApi.getById(id),
    enabled: !!id,
  });
};
