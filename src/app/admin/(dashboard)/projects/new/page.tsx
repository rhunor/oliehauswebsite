import { requireAuth } from '@/lib/dal';
import { ProjectForm } from '@/components/admin/ProjectForm';

export const metadata = {
  title: 'Add New Project - Admin',
};

export default async function NewProjectPage() {
  await requireAuth();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-white">Add New Project</h1>
      <ProjectForm />
    </div>
  );
}