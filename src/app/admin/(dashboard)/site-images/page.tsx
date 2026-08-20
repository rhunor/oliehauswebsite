import { requireAuth } from '@/lib/dal';
import { SiteImagesManager } from '@/components/admin/SiteImagesManager';

export const metadata = {
  title: 'Site Images - Admin',
};

export default async function SiteImagesPage() {
  await requireAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Site Images</h1>
        <p className="mt-1 text-neutral-400">
          Replace any photo shown on the public website — no code changes needed.
        </p>
      </div>

      <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-3">How this works</h2>
        <ul className="space-y-2 text-sm text-neutral-400 list-disc list-inside">
          <li>
            Every photo below is grouped by the page it appears on (Home, About, Services, Contact, Testimonials).
          </li>
          <li>
            Click <span className="text-neutral-200 font-medium">&ldquo;Replace Image&rdquo;</span> under any photo to upload a new one —
            it goes live on the website immediately, no publishing step needed.
          </li>
          <li>
            Accepted files: PNG, JPG, or WebP, up to 10MB — the same as Blog Posts and Projects uploads.
          </li>
          <li>
            Photos marked <span className="rounded bg-amber-500/90 px-1.5 py-0.5 text-[10px] font-medium text-neutral-900">Custom</span> have
            already been replaced by an admin. Click <span className="text-neutral-200 font-medium">&ldquo;Reset to original&rdquo;</span> on
            any of them to bring back the site&apos;s original photo.
          </li>
          <li>
            The optional alt text field describes the photo for screen readers and search engines — leave it as-is if unsure.
          </li>
        </ul>
      </div>

      <SiteImagesManager />
    </div>
  );
}
