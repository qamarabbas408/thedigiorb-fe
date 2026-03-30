import apiClient from '../client';
import { Stat } from '../types';

export const statsApi = {
  getAll: async (): Promise<Stat[]> => {
    const response = await apiClient.get('/stats');
    return response.data.data || response.data;
  },

  getBySection: async (section: string, includeGlobal = true): Promise<Stat[]> => {
    const response = await apiClient.get(`/stats?section=${section}&include_global=${includeGlobal}`);
    return response.data.data || response.data;
  },

  getGlobalStats: async (): Promise<Stat[]> => {
    const response = await apiClient.get('/global-stats');
    return response.data.data || response.data;
  },
};
