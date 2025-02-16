'use client';

import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--primary)] mb-2">
            Focus Music Generator
          </h1>
          <p className="text-[var(--secondary)] text-lg">
            Generate personalized music to enhance your concentration
          </p>
        </header>
        
        <main className="fade-in">
          {children}
        </main>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Created with focus in mind</p>
        </footer>
      </div>
    </div>
  );
}
