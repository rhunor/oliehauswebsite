'use client';

import { useEffect, useState } from 'react';

interface UseHydrationSafeReturn {
  isClient: boolean;
  isHydrated: boolean;
}

export function useHydrationSafe(): UseHydrationSafeReturn {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    // Small delay to ensure hydration is complete
    const timer = setTimeout(() => setIsHydrated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return { isClient, isHydrated };
}