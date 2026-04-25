'use client';

import { useIngredients } from '@/features/ingredient/hooks/useIngredients';
import Link from 'next/link';
import ImageWithFallback from '@/shared/components/ImageWithFallback';
import { useState } from 'react';
import { useDebounce } from '@/shared/utils/useDebounce';
import { Ingredient } from '@/features/ingredient/types';

export default function Page() {
  const { data, isLoading } = useIngredients() as {
    data: Ingredient[];
    isLoading: boolean;
  };
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search);

  const filtered: Ingredient[] =
    data?.filter((item) =>
      item.strIngredient.toLowerCase().includes(debounced.toLowerCase())
    ) || [];

  return (
    <div>

      {/* HERO */}
      <div className="bg-gray-100 p-12 rounded-2xl mb-10 text-center">
        <p className="text-sm text-gray-400 mb-2">
          mealapp API website
        </p>

        <h1 className="text-4xl font-bold text-gray-800">
          See All The Delicious Foods
        </h1>
      </div>

      {/* SEARCH */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search ingredients..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          className="w-full max-w-md p-3 border rounded-xl"
        />
      </div>

      {/* LOADING */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <Link
            key={item.idIngredient}
            href={`/ingredients/${item.strIngredient}`}
          >
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg">

              {/* IMAGE */}
              <ImageWithFallback
                src={`https://www.themealdb.com/images/ingredients/${item.strIngredient}.png`}
                alt={item.strIngredient}
                className="w-full h-32"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <p className="text-white font-semibold text-lg text-center px-2">
                  {item.strIngredient}
                </p>
              </div>

            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}