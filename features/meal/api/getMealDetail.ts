import { api } from '@/shared/lib/api';

export const getMealDetail = async (id: string) => {
  const res = await api.get(`/lookup.php?i=${id}`);
  return res.data.meals[0];
};