'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AIProfileAnalysisRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/my-dj-plan');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="text-xl text-gray-900 mb-4">Redirecting to My DJ Plan...</div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto"></div>
      </div>
    </div>
  );
}