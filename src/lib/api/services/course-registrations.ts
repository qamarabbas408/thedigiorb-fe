import apiClient from '../client';
import { CourseRegistration } from '../types';

export const courseRegistrationsApi = {
  submit: async (data: Omit<CourseRegistration, 'id' | 'read' | 'created_at' | 'status'>): Promise<void> => {
    await apiClient.post('/course-registrations', data);
  },
};
