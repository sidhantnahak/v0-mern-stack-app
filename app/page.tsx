'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the MERN Todo app
    window.location.href = 'http://localhost:5000';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">MERN Todo App</h1>
        <p className="text-lg text-gray-600 mb-8">Redirecting to your application...</p>
        <div className="inline-block">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
        <p className="text-sm text-gray-500 mt-8">
          If not redirected, <a href="http://localhost:5000" className="text-indigo-600 hover:underline">click here</a>
        </p>
      </div>
    </div>
  );
}
