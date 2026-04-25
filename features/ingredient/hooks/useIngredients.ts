import { useQuery } from '@tanstack/react-query';
import { getIngredients } from '../api/getIngredients';

export const useIngredients = () => {
  return useQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
    staleTime: 1000 * 60 * 10, // 10 menit
  });
};