import apiClient from '../client';
import { Service } from '../types';

export const servicesApi = {
  getAll: async (): Promise<Service[]> => {
    const response = await apiClient.get('/services');
    return response.data.data || response.data;
  },

  getPublished: async (): Promise<Service[]> => {
    const response = await apiClient.get('/services?status=published');
    return response.data.data || response.data;
  },

  getFeatured: async (): Promise<Service[]> => {
    const response = await apiClient.get('/services?featured=true');
    return response.data.data || response.data;
  },

  getById: async (id: string | number): Promise<Service> => {
    const response = await apiClient.get(`/services/${id}`);
    return response.data.data || response.data;
  },
};
