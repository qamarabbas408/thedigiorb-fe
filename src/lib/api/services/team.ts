import apiClient from '../client';
import { TeamMember, TeamMemberProfile } from '../types';
import { processImageUrl, processImageUrls } from '../utils';

export const teamApi = {
  getActive: async (): Promise<TeamMember[]> => {
    const response = await apiClient.get('/team?status=active');
    const data = response.data.data || response.data;
    return Array.isArray(data) ? data.map((item: TeamMember) => processImageUrls(item, ['image'])) : data;
  },

  getById: async (id: string | number): Promise<TeamMemberProfile> => {
    const response = await apiClient.get(`/team/${id}`);
    const data = response.data.data || response.data;
    const profile: TeamMemberProfile = { ...data };

    if (profile.photo) {
      profile.photo = processImageUrl(profile.photo);
    }
    if (Array.isArray(profile.projects)) {
      profile.projects = profile.projects.map((project) => ({
        ...project,
        image: project.image ? processImageUrl(project.image) : project.image,
      }));
    }

    return profile;
  },
};