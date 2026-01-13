'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  LogOut,
  Settings,
  User,
} from 'lucide-react';

interface AdminSidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Blog Posts',
    href: '/admin/blog',
    icon: FileText,
  },
  {
    label: 'Projects',
    href: '/admin/projects',
    icon: FolderOpen,
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <aside className="flex h-screen w-64 flex-col bg-neutral-900 border-r border-neutral-800">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center justify-center border-b border-neutral-800">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-white">OliveHaus</span>
          <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
            Admin
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-amber-500/10 text-amber-500'
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile & Sign Out */}
      <div className="border-t border-neutral-800 p-4">
        <div className="mb-3 flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800">
            <User className="h-5 w-5 text-neutral-400" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-white">
              {user.name ?? 'Admin'}
            </p>
            <p className="truncate text-xs text-neutral-500">
              {user.email ?? ''}
            </p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center justify-center space-x-2 rounded-lg bg-neutral-800 px-3 py-2 text-sm font-medium text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}