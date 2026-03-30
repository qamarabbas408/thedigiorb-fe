import apiClient from '../client';
import { Stat } from '../types';

export const statsApi = {
  getAll: async (): Promise<Stat[]> => {
    const response = await apiClient.get('/stats');
    return response.data.data || response.data;
  },

  getBySection: async (section: string): Promise<Stat[]> => {
    const response = await apiClient.get(`/stats?section=${section}`);
    return response.data.data || response.data;
  },
};
