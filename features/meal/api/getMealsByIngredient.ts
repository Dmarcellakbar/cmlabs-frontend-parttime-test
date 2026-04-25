import { api } from '@/shared/lib/api';

export const getMealsByIngredient = async (ingredient: string) => {
  const res = await api.get(`/filter.php?i=${ingredient}`);
  return res.data.meals;
};