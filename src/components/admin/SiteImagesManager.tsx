'use client';

import { useEffect, useState, useCallback } from 'react';
import { Check, Loader2, RotateCcw, AlertCircle } from 'lucide-react';
import { CloudinaryUpload } from './CloudinaryUpload';
import {
  SITE_IMAGE_SLOTS,
  SITE_IMAGE_PAGES,
  type SiteImageSlot,
} from '@/lib/siteImageSlots';

interface OverrideRecord {
  url: string;
  alt: string;
}

type OverridesState = Record<string, OverrideRecord>;
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

async function fetchOverrides(): Promise<OverridesState> {
  const res = await fetch('/api/site-images', { cache: 'no-store' });
  if (!res.ok) return {};
  const json: { success?: boolean; data?: OverridesState } = await res.json();
  return json.success && json.data ? json.data : {};
}

interface SlotCardProps {
  slot: SiteImageSlot;
  override: OverrideRecord | undefined;
  compact?: boolean;
  onSaved: (key: string, override: OverrideRecord) => void;
  onReset: (key: string) => void;
}

function SlotCard({ slot, override, compact, onSaved, onReset }: SlotCardProps) {
  const [altDraft, setAltDraft] = useState(override?.alt ?? '');
  const [status, setStatus] = useState<SaveStatus>('idle');

  useEffect(() => {
    setAltDraft(override?.alt ?? '');
  }, [override?.alt]);

  const currentSrc = override?.url || slot.src;

  const persist = useCallback(
    async (url: string, alt: string) => {
      setStatus('saving');
      try {
        const res = await fetch(`/api/site-images/${encodeURIComponent(slot.key)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, alt }),
        });
        if (!res.ok) throw new Error('Save failed');
        const json: { success?: boolean; data?: { url: string; alt: string } } = await res.json();
        if (!json.success || !json.data) throw new Error('Save failed');
        onSaved(slot.key, { url: json.data.url, alt: json.data.alt });
        setStatus('saved');
        setTimeout(() => setStatus((s) => (s === 'saved' ? 'idle' : s)), 2000);
      } catch {
        setStatus('error');
      }
    },
    [slot.key, onSaved]
  );

  const handleUploadSuccess = (url: string) => {
    if (!url) return;
    void persist(url, altDraft);
  };

  const handleUploadError = () => setStatus('error');

  const handleAltBlur = () => {
    if (altDraft === (override?.alt ?? '')) return;
    void persist(currentSrc, altDraft);
  };

  const handleReset = async () => {
    setStatus('saving');
    try {
      const res = await fetch(`/api/site-images/${encodeURIComponent(slot.key)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Reset failed');
      onReset(slot.key);
      setAltDraft('');
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 space-y-2">
      <div className={`relative w-full overflow-hidden rounded-md bg-neutral-800 ${compact ? 'aspect-square' : 'aspect-[4/3]'}`}>
        {/* Static/CDN + Cloudinary sources only — plain img avoids next/image domain config churn here */}
        <img src={currentSrc} alt={altDraft || slot.alt} className="h-full w-full object-cover" />
        {override && (
          <span className="absolute left-1.5 top-1.5 rounded bg-amber-500/90 px-1.5 py-0.5 text-[10px] font-medium text-neutral-900">
            Custom
          </span>
        )}
      </div>

      <p className={`font-medium text-neutral-300 ${compact ? 'text-xs truncate' : 'text-sm'}`} title={slot.label}>
        {slot.label}
      </p>

      {!compact && (
        <input
          type="text"
          value={altDraft}
          onChange={(e) => setAltDraft(e.target.value)}
          onBlur={handleAltBlur}
          placeholder="Alt text (for accessibility & SEO)"
          className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-2 py-1.5 text-xs text-neutral-200 placeholder:text-neutral-500 focus:border-amber-500 focus:outline-none"
        />
      )}

      <div className="flex items-center gap-2">
        <div className="flex-1">
          <CloudinaryUpload
            label={compact ? 'Replace' : 'Replace Image'}
            folder="olivehaus/site-images"
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
          />
        </div>
      </div>

      <div className="flex items-center justify-between min-h-[20px]">
        {override ? (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-amber-500 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset to original
          </button>
        ) : (
          <span className="text-xs text-neutral-600">Original site photo</span>
        )}

        {status === 'saving' && <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />}
        {status === 'saved' && <Check className="h-4 w-4 text-green-500" />}
        {status === 'error' && (
          <span className="flex items-center gap-1 text-xs text-red-400">
            <AlertCircle className="h-3 w-3" /> Failed
          </span>
        )}
      </div>
    </div>
  );
}

export function SiteImagesManager() {
  const [overrides, setOverrides] = useState<OverridesState>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOverrides()
      .then(setOverrides)
      .finally(() => setIsLoading(false));
  }, []);

  const handleSaved = useCallback((key: string, override: OverrideRecord) => {
    setOverrides((prev) => ({ ...prev, [key]: override }));
  }, []);

  const handleReset = useCallback((key: string) => {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-neutral-400 text-sm py-12 justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading site images…
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {SITE_IMAGE_PAGES.map((page) => {
        const pageSlots = SITE_IMAGE_SLOTS.filter((s) => s.page === page);
        const heroSlots = pageSlots.filter((s) => s.key.startsWith('home.hero.'));
        const otherSlots = pageSlots.filter((s) => !s.key.startsWith('home.hero.'));

        return (
          <section key={page}>
            <h2 className="text-lg font-semibold text-white mb-4">{page}</h2>

            {heroSlots.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-neutral-400 mb-3">Hero slideshow ({heroSlots.length} slides)</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {heroSlots.map((slot) => (
                    <SlotCard
                      key={slot.key}
                      slot={slot}
                      override={overrides[slot.key]}
                      compact
                      onSaved={handleSaved}
                      onReset={handleReset}
                    />
                  ))}
                </div>
              </div>
            )}

            {otherSlots.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {otherSlots.map((slot) => (
                  <SlotCard
                    key={slot.key}
                    slot={slot}
                    override={overrides[slot.key]}
                    onSaved={handleSaved}
                    onReset={handleReset}
                  />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
