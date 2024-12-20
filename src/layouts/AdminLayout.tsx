import { Outlet } from 'react-router-dom';
import { AdminHeader } from '../components/admin/AdminHeader';

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <AdminHeader />
      <div className="max-w-7xl mx-auto mt-8">
        <Outlet />
      </div>
    </div>
  );
}