'use client';

import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Breadcrumb from '@/shared/components/Breadcrumb';
import { useMealDetail } from '@/features/meal/hooks/useMealDetail';

// ✅ TYPE SAFE (NO ANY)
type IngredientIndex =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

type IngredientKey = `strIngredient${IngredientIndex}`;
type MeasureKey = `strMeasure${IngredientIndex}`;

type MealDetail = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strYoutube?: string;
} & {
  [K in IngredientKey]?: string;
} & {
  [K in MeasureKey]?: string;
};

export default function Page() {
  const { id } = useParams() as { id: string };
  const searchParams = useSearchParams();
  const ingredient = searchParams.get('ingredient');

  const { data: meal, isLoading } = useMealDetail(id) as {
    data: MealDetail | undefined;
    isLoading: boolean;
  };

  // 🔄 LOADING
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="h-8 w-48 bg-gray-200 animate-pulse mb-6 rounded" />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-80 bg-gray-200 animate-pulse rounded-xl" />

          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 animate-pulse rounded"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ❌ NOT FOUND
  if (!meal) {
    return <p className="p-6">Meal not found</p>;
  }

  // 🎥 YOUTUBE EMBED
  const youtubeEmbed = meal.strYoutube
    ? meal.strYoutube
        .replace('watch?v=', 'embed/')
        .replace('youtube.com', 'youtube-nocookie.com')
    : null;

  // 🥕 EXTRACT INGREDIENTS (TYPE SAFE)
  const ingredients = (Array.from({ length: 20 }, (_, i) => {
    const index = (i + 1) as IngredientIndex;

    const ingredientKey = `strIngredient${index}` as IngredientKey;
    const measureKey = `strMeasure${index}` as MeasureKey;

    const name = meal[ingredientKey];
    const measure = meal[measureKey];

    if (!name || name.trim() === '') return null;

    return {
      name,
      measure,
    };
  }).filter(Boolean) as { name: string; measure?: string }[]);

  const imageUrl = meal.strMealThumb || '/fallback.png';

  return (
    <div className="p-6">
      {/* BREADCRUMB */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          {
            label: ingredient || 'Ingredients',
            href: ingredient ? `/ingredients/${ingredient}` : '/',
          },
          { label: meal.strMeal },
        ]}
      />

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6">
        {meal.strMeal}
      </h1>

      {/* MAIN */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* IMAGE */}
        <div className="relative w-full h-80 rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={meal.strMeal}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        {/* INGREDIENTS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Ingredients
          </h2>

          <ul className="space-y-2">
            {ingredients.map((item, index) => (
              <li
                key={index}
                className="flex justify-between border-b pb-1"
              >
                <span>{item.name}</span>
                <span className="text-gray-500">
                  {item.measure}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* INSTRUCTIONS */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Instructions
        </h2>

        <p className="text-gray-600 whitespace-pre-line leading-relaxed">
          {meal.strInstructions}
        </p>
      </div>

      {/* YOUTUBE */}
      {youtubeEmbed && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">
            Video Tutorial
          </h2>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              src={youtubeEmbed}
              title={meal.strMeal}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}