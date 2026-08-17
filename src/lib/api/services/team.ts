import apiClient from '../client';
import { TeamMember } from '../types';
import { processImageUrls } from '../utils';

export const teamApi = {
  getActive: async (): Promise<TeamMember[]> => {
    const response = await apiClient.get('/team?status=active');
    const data = response.data.data || response.data;
    return Array.isArray(data) ? data.map((item: TeamMember) => processImageUrls(item, ['image'])) : data;
  },
};