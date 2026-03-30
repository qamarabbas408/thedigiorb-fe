import apiClient from '../client';
import { TeamMember } from '../types';

export const teamApi = {
  getAll: async (): Promise<TeamMember[]> => {
    const response = await apiClient.get('/team');
    return response.data.data || response.data;
  },

  getActive: async (): Promise<TeamMember[]> => {
    const response = await apiClient.get('/team?status=active');
    return response.data.data || response.data;
  },

  getById: async (id: string | number): Promise<TeamMember> => {
    const response = await apiClient.get(`/team/${id}`);
    return response.data.data || response.data;
  },
};
