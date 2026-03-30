import { useQuery } from '@tanstack/react-query';
import { teamApi } from '@/lib/api';

export const useTeam = () => {
  return useQuery({
    queryKey: ['team'],
    queryFn: () => teamApi.getAll(),
  });
};

export const useActiveTeam = () => {
  return useQuery({
    queryKey: ['team', 'active'],
    queryFn: () => teamApi.getActive(),
  });
};

export const useTeamMemberById = (id: string | number) => {
  return useQuery({
    queryKey: ['teamMember', id],
    queryFn: () => teamApi.getById(id),
    enabled: !!id,
  });
};
