import apiClient from '../client';
import { Contact } from '../types';

export const contactsApi = {
  submit: async (data: Omit<Contact, 'id' | 'read' | 'created_at'>): Promise<void> => {
    await apiClient.post('/contacts', data);
  },
};
