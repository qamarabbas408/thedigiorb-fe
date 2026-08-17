import { useQuery } from '@tanstack/react-query';
import { teamApi } from '@/lib/api';

export const useActiveTeam = () => {
  return useQuery({
    queryKey: ['team', 'active'],
    queryFn: () => teamApi.getActive(),
  });
};