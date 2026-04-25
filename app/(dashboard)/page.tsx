'use client';

import { useIngredients } from '@/features/ingredient/hooks/useIngredients';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useDebounce } from '@/shared/utils/useDebounce';
import { Ingredient } from '@/features/ingredient/types';

const ITEMS_PER_PAGE = 8;

export default function Page() {
  const { data, isLoading } = useIngredients() as {
    data: Ingredient[];
    isLoading: boolean;
  };

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const debounced = useDebounce(search);

  // 🔍 FILTER
  const filtered: Ingredient[] =
    data?.filter((item) =>
      item.strIngredient.toLowerCase().includes(debounced.toLowerCase())
    ) || [];

  // 📄 PAGINATION
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedData = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // 🔢 PAGE NUMBER LOGIC (window + ...)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

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
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page saat search
          }}
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
        {paginatedData.map((item) => (
          <Link
            key={item.idIngredient}
            href={`/ingredients/${item.strIngredient}`}
          >
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg">
              
              <div className="relative w-full h-32 bg-gray-100">
                <Image
                  src={item.strThumb}
                  alt={item.strIngredient}
                  fill
                  unoptimized
                  className="object-contain p-2 group-hover:scale-110 transition duration-300"
                />
              </div>

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <p className="text-white font-semibold text-lg text-center px-2">
                  {item.strIngredient}
                </p>
              </div>

            </div>
          </Link>
        ))}
      </div>

      {/* PAGINATION (SINGLE ROW CLEAN) */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 items-center gap-2 flex-nowrap overflow-x-auto">

          {/* PREV */}
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-2 border rounded-lg whitespace-nowrap hover:bg-gray-100"
          >
            Prev
          </button>

          {/* NUMBERS */}
          {getPageNumbers().map((p, i) =>
            p === '...' ? (
              <span key={i} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={i}
                onClick={() => setPage(p as number)}
                className={`px-3 py-2 border rounded-lg ${
                  page === p
                    ? 'bg-black text-white shadow'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            )
          )}

          {/* NEXT */}
          <button
            onClick={() =>
              setPage((p) => Math.min(p + 1, totalPages))
            }
            className="px-3 py-2 border rounded-lg whitespace-nowrap hover:bg-gray-100"
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
}