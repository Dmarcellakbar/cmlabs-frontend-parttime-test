import { useQuery } from '@tanstack/react-query';
import { getMealDetail } from '../api/getMealDetail';

export const useMealDetail = (id: string) => {
  return useQuery({
    queryKey: ['meal', id],
    queryFn: () => getMealDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30
  });
};