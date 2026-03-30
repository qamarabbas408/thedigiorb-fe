import apiClient from '../client';
import { Project } from '../types';
import { processImageUrls } from '../utils';

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const response = await apiClient.get('/portfolio/projects');
    const data = response.data.data || response.data;
    return Array.isArray(data) ? data.map((item: Project) => processImageUrls(item, ['image'])) : data;
  },

  getPublished: async (): Promise<Project[]> => {
    const response = await apiClient.get('/portfolio/projects?status=published');
    const data = response.data.data || response.data;
    return Array.isArray(data) ? data.map((item: Project) => processImageUrls(item, ['image'])) : data;
  },

  getByCategory: async (categoryId: string): Promise<Project[]> => {
    const response = await apiClient.get(`/portfolio/projects?categoryId=${categoryId}`);
    const data = response.data.data || response.data;
    return Array.isArray(data) ? data.map((item: Project) => processImageUrls(item, ['image'])) : data;
  },

  getFeatured: async (): Promise<Project[]> => {
    const response = await apiClient.get('/portfolio/projects?featured=true');
    const data = response.data.data || response.data;
    return Array.isArray(data) ? data.map((item: Project) => processImageUrls(item, ['image'])) : data;
  },

  getById: async (id: string | number): Promise<Project> => {
    const response = await apiClient.get(`/portfolio/projects/${id}`);
    const data = response.data.data || response.data;
    return processImageUrls(data, ['image']);
  },
};
