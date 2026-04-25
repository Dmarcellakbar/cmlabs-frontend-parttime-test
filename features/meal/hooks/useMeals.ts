import { useQuery } from '@tanstack/react-query';
import { getMealsByIngredient } from '../api/getMealsByIngredient';

export const useMeals = (ingredient: string) => {
  return useQuery({
    queryKey: ['meals', ingredient],
    queryFn: () => getMealsByIngredient(ingredient),
    enabled: !!ingredient,
    staleTime: 1000 * 60 * 30
  });
};