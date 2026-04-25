'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Breadcrumb from '@/shared/components/Breadcrumb';
import { useSearchParams } from 'next/navigation';

type MealDetail = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
};

export default function Page() {
  const { id } = useParams() as { id: string };

  const searchParams = useSearchParams();
  const ingredient = searchParams.get('ingredient');

  // 👉 sementara dummy (ganti dengan API kamu nanti)
  const meal: MealDetail = {
    idMeal: id,
    strMeal: 'Meal Detail',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
    strInstructions: 'Cooking instructions will be here...',
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          {
            label: ingredient || 'Ingredients',
            href: `/ingredients/${ingredient}`,
          },
          { label: meal.strMeal },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">
        {meal.strMeal}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative w-full h-80">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <p className="text-gray-600">
            {meal.strInstructions}
          </p>
        </div>
      </div>
    </div>
  );
}