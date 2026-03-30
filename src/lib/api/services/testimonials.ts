import apiClient from '../client';
import { Testimonial } from '../types';

export const testimonialsApi = {
  getAll: async (): Promise<Testimonial[]> => {
    const response = await apiClient.get('/testimonials');
    return response.data.data || response.data;
  },

  getPublished: async (): Promise<Testimonial[]> => {
    const response = await apiClient.get('/testimonials/published');
    return response.data.data || response.data;
  },

  getFeatured: async (): Promise<Testimonial[]> => {
    const response = await apiClient.get('/testimonials/featured');
    return response.data.data || response.data;
  },
};
