import { api } from '@/shared/lib/api';

export const getIngredients = async () => {
  const res = await api.get('/list.php?i=list');
  return res.data.meals;
};