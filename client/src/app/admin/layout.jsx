import { AdminShell } from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
