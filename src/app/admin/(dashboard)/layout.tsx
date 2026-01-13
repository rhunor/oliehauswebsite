import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Providers } from '@/components/Providers';

export const metadata = {
  title: 'Admin Dashboard - OliveHaus Interiors',
  description: 'Manage your blog posts and projects',
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getServerSession(authOptions);

  // Check if user is authenticated
  if (!session?.user) {
    redirect('/admin/login');
  }

  return (
    <Providers>
      <div className="flex min-h-screen bg-neutral-950">
        <AdminSidebar user={session.user} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </Providers>
  );
}