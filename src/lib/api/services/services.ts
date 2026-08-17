import apiClient from '../client';
import { Service } from '../types';

export const servicesApi = {
  getPublished: async (): Promise<Service[]> => {
    const response = await apiClient.get('/services?status=published');
    return response.data.data || response.data;
  },
};