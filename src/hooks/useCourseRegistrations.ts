import { useMutation } from '@tanstack/react-query';
import { courseRegistrationsApi } from '@/lib/api';
import { CourseRegistration } from '@/lib/api/types';

export const useSubmitCourseRegistration = () => {
  return useMutation({
    mutationFn: (data: Omit<CourseRegistration, 'id' | 'read' | 'created_at' | 'status'>) => 
      courseRegistrationsApi.submit(data),
  });
};
