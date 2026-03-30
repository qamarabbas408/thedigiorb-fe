import apiClient from '../client';
import { Category } from '../types';

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get('/portfolio/categories');
    return response.data.data || response.data;
  },

  getById: async (id: string): Promise<Category> => {
    const response = await apiClient.get(`/portfolio/categories?id=${id}`);
    return response.data.data || response.data;
  },
};
