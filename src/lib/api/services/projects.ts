import apiClient from '../client';
import { Project } from '../types';

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const response = await apiClient.get('/portfolio/projects');
    return response.data.data || response.data;
  },

  getPublished: async (): Promise<Project[]> => {
    const response = await apiClient.get('/portfolio/projects?status=published');
    return response.data.data || response.data;
  },

  getByCategory: async (categoryId: string): Promise<Project[]> => {
    const response = await apiClient.get(`/portfolio/projects?categoryId=${categoryId}`);
    return response.data.data || response.data;
  },

  getFeatured: async (): Promise<Project[]> => {
    const response = await apiClient.get('/portfolio/projects?featured=true');
    return response.data.data || response.data;
  },

  getById: async (id: string | number): Promise<Project> => {
    const response = await apiClient.get(`/portfolio/projects/${id}`);
    return response.data.data || response.data;
  },
};
