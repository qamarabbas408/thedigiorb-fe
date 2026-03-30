import { useMutation } from '@tanstack/react-query';
import { contactsApi } from '@/lib/api';
import { Contact } from '@/lib/api/types';

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: (data: Omit<Contact, 'id' | 'read' | 'created_at'>) => 
      contactsApi.submit(data),
  });
};
