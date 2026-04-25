'use client';

import Link from 'next/link';

type Item = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: Item[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">

          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-orange-500 transition"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-700 font-medium">
              {item.label}
            </span>
          )}

          {index !== items.length - 1 && (
            <span className="text-gray-300">›</span>
          )}
        </div>
      ))}
    </nav>
  );
}