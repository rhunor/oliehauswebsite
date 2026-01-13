import { requireAuth } from '@/lib/dal';

export const metadata = {
  title: 'Settings - Admin',
};

export default async function SettingsPage() {
  const session = await requireAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-neutral-400">
          Manage your account and preferences
        </p>
      </div>

      {/* Account Info */}
      <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-400">Name</label>
            <p className="mt-1 text-white">{session.user.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400">Email</label>
            <p className="mt-1 text-white">{session.user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400">Role</label>
            <p className="mt-1">
              <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-500 capitalize">
                {session.user.role}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Environment Info */}
      <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Environment</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">Cloudinary Status</span>
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
              process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME 
                ? 'bg-green-500/10 text-green-400' 
                : 'bg-red-500/10 text-red-400'
            }`}>
              {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? 'Configured' : 'Not configured'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-neutral-400">MongoDB Status</span>
            <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400">
              Connected
            </span>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Help</h2>
        <div className="space-y-3 text-sm text-neutral-400">
          <p>
            <strong className="text-white">Blog Posts:</strong> Create and manage blog articles. 
            Posts can be saved as drafts or published immediately.
          </p>
          <p>
            <strong className="text-white">Projects:</strong> Add portfolio projects that will 
            appear alongside existing projects on your website. Use the order field to control 
            display position.
          </p>
          <p>
            <strong className="text-white">Images:</strong> All images are stored in Cloudinary 
            for fast delivery and automatic optimization.
          </p>
        </div>
      </div>
    </div>
  );
}