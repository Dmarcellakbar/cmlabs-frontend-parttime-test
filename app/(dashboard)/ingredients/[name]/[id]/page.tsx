'use client';

import { useParams } from 'next/navigation';
import { useMeals } from '@/features/meal/hooks/useMeals';
import Breadcrumb from '@/shared/components/Breadcrumb';
import Link from 'next/link';
import { Meal } from '@/features/meal/types';
import Image from 'next/image';

type Params = {
  name: string;
};

export default function Page() {
  const params = useParams() as Params;

  const ingredientName = params.name;
  const { data } = useMeals(ingredientName);

  return (
    <div>

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: ingredientName },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6">
        {ingredientName} Meals
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data?.map((meal: Meal) => (
          <div
            key={meal.idMeal}
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
          >
            <Link href={`/ingredients/${ingredientName}/${meal.idMeal}`} prefetch>
              <div className="relative w-full h-40">
              
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition duration-300"
              />

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <p className="text-white text-sm text-center px-2">
                  {meal.strMeal}
                </p>
              </div>

            </div>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}