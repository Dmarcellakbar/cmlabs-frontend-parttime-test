'use client';

import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">

      {/* NAVBAR */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* LOGO */}
          <h1 className="font-bold text-lg">mealapp</h1>

          {/* MENU */}
          <nav className="flex gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-500">Home</Link>
            <Link href="/" className="hover:text-orange-500">Foods</Link>
            <Link href="/" className="hover:text-orange-500">Ingredients</Link>
          </nav>

        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>

    </div>
  );
}