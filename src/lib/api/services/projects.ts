import apiClient from '../client';
import { Project } from '../types';
import { processImageUrls } from '../utils';

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const response = await apiClient.get('/portfolio/projects');
    const data = response.data.data || response.data;
    return Array.isArray(data) ? data.map((item: Project) => processImageUrls(item, ['image', 'gallery'])) : data;
  },

  getPublished: async (limit?: number, offset?: number): Promise<Project[]> => {
    let url = '/portfolio/projects?status=published';
    if (limit) {
      url += `&limit=${limit}`;
    }
    if (offset !== undefined) {
      url += `&offset=${offset}`;
    }
    const response = await apiClient.get(url);
    const data = response.data.data || response.data;
    return Array.isArray(data) ? data.map((item: Project) => processImageUrls(item, ['image', 'gallery'])) : data;
  },

  getPublishedWithTotal: async (limit: number = 12, offset: number = 0, categoryId?: string): Promise<{ projects: Project[]; total: number }> => {
    let url = `/portfolio/projects?status=published&limit=${limit}&offset=${offset}`;
    if (categoryId) {
      url += `&categoryId=${categoryId}`;
    }
    const response = await apiClient.get(url);
    const data = response.data.data || response.data;
    const projects = Array.isArray(data) ? data.map((item: Project) => processImageUrls(item, ['image', 'gallery'])) : [];
    const total = response.data.total || projects.length;
    return { projects, total };
  },

  getByCategory: async (categoryId: string): Promise<Project[]> => {
    const response = await apiClient.get(`/portfolio/projects?categoryId=${categoryId}`);
    const data = response.data.data || response.data;
    return Array.isArray(data) ? data.map((item: Project) => processImageUrls(item, ['image', 'gallery'])) : data;
  },

  getFeatured: async (): Promise<Project[]> => {
    const response = await apiClient.get('/portfolio/projects?featured=true');
    const data = response.data.data || response.data;
    return Array.isArray(data) ? data.map((item: Project) => processImageUrls(item, ['image', 'gallery'])) : data;
  },

  getById: async (id: string | number): Promise<Project> => {
    const response = await apiClient.get(`/portfolio/projects/${id}`);
    const data = response.data.data || response.data;
    return processImageUrls(data, ['image', 'gallery']);
  },
};
