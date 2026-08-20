'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export interface SiteImageOverride {
  url: string;
  alt?: string;
}

type OverridesMap = Record<string, SiteImageOverride>;

const SiteImagesContext = createContext<OverridesMap>({});

export function SiteImagesProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<OverridesMap>({});

  useEffect(() => {
    let cancelled = false;

    fetch('/api/site-images')
      .then((res) => (res.ok ? res.json() : null))
      .then((json: { success?: boolean; data?: OverridesMap } | null) => {
        if (!cancelled && json?.success && json.data) {
          setOverrides(json.data);
        }
      })
      .catch(() => {
        // Silently keep default/static images if the fetch fails
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <SiteImagesContext.Provider value={overrides}>{children}</SiteImagesContext.Provider>;
}

export interface SiteImageSpec {
  key: string;
  src: string;
  alt: string;
}

export interface ResolvedSiteImage {
  src: string;
  alt: string;
}

function resolve(spec: SiteImageSpec, overrides: OverridesMap): ResolvedSiteImage {
  const override = overrides[spec.key];
  if (!override || !override.url) {
    return { src: spec.src, alt: spec.alt };
  }
  return {
    src: override.url,
    alt: override.alt?.trim() ? override.alt : spec.alt,
  };
}

/** Resolves a single image slot to its admin override, falling back to the static default. */
export function useSiteImage(spec: SiteImageSpec): ResolvedSiteImage {
  const overrides = useContext(SiteImagesContext);
  return useMemo(() => resolve(spec, overrides), [spec, overrides]);
}

/** Resolves a fixed list of image slots (e.g. a slideshow or gallery) in one pass. */
export function useSiteImages(specs: SiteImageSpec[]): ResolvedSiteImage[] {
  const overrides = useContext(SiteImagesContext);
  return useMemo(() => specs.map((spec) => resolve(spec, overrides)), [specs, overrides]);
}
