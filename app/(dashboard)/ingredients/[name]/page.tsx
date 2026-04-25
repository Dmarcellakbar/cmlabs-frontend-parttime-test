'use client';

import { useParams } from 'next/navigation';
import { useMeals } from '@/features/meal/hooks/useMeals';
import Breadcrumb from '@/shared/components/Breadcrumb';
import Link from 'next/link';
import Image from 'next/image';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export default function Page() {
  const { name } = useParams() as { name: string };

  const { data } = useMeals(name) as {
    data: Meal[] | undefined;
  };

  return (
    <div>
      {/* BREADCRUMB */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: name },
        ]}
      />

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6">
        {name} Meals
      </h1>

      {/* EMPTY STATE */}
      {!data?.length && (
        <p className="text-gray-500">
          No meals found for {name}
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data?.map((meal: Meal) => {
          const imageUrl =
            meal.strMealThumb ||
            '/fallback.png'; // optional fallback

          return (
            <div
              key={meal.idMeal}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Link
                href={{
                  pathname: `/meals/${meal.idMeal}`,
                  query: { ingredient: name },
                }}
              >
                <div className="relative w-full h-40 bg-gray-100">
                  <Image
                    src={imageUrl}
                    alt={meal.strMeal}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition duration-300"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <p className="text-white text-sm text-center px-2">
                      {meal.strMeal}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}