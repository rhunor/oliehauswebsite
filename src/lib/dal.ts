import 'server-only';
import { getServerSession } from 'next-auth';
import { cache } from 'react';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

/**
 * Data Access Layer (DAL) for authentication
 * Centralizes authentication checks and provides cached session verification
 */

export interface VerifiedSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'superadmin';
  };
}

/**
 * Cached session verification
 * Uses React's cache() to prevent redundant session checks within a single render
 */
export const verifySession = cache(async (): Promise<VerifiedSession | null> => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  return {
    user: {
      id: session.user.id as string,
      email: session.user.email as string,
      name: session.user.name as string,
      role: session.user.role as 'admin' | 'superadmin',
    },
  };
});

/**
 * Require authentication - redirects to login if not authenticated
 */
export async function requireAuth(): Promise<VerifiedSession> {
  const session = await verifySession();

  if (!session) {
    redirect('/admin/login');
  }

  return session;
}

/**
 * Require superadmin role
 */
export async function requireSuperAdmin(): Promise<VerifiedSession> {
  const session = await requireAuth();

  if (session.user.role !== 'superadmin') {
    redirect('/admin/dashboard');
  }

  return session;
}

/**
 * Check if user is authenticated without redirecting
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await verifySession();
  return session !== null;
}

/**
 * Get current user or null
 */
export async function getCurrentUser() {
  const session = await verifySession();
  return session?.user ?? null;
}