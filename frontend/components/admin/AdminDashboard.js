import { useState, useEffect } from 'react';
import {
  ChartBarIcon,
  FolderIcon,
  ArrowLeftOnRectangleIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const AdminDashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: ChartBarIcon,
      current: router.pathname === '/admin/dashboard'
    },
    {
      name: 'Software',
      href: '/admin/software',
      icon: Squares2X2Icon,
      current: router.pathname.startsWith('/admin/software')
    },
    {
      name: 'Categories',
      href: '/admin/categories',
      icon: FolderIcon,
      current: router.pathname.startsWith('/admin/categories')
    }
  ];

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      toast.success('Logged out successfully');
      router.push('/admin/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <h1 className="text-xl font-semibold">Admin Panel</h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden"
            >
              ×
            </button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`${
          isSidebarOpen ? 'lg:pl-64' : ''
        } flex flex-col min-h-screen`}
      >
        <header className="sticky top-0 z-40 flex items-center h-16 bg-white shadow-sm">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`px-4 lg:hidden ${isSidebarOpen ? 'hidden' : ''}`}
          >
            ☰
          </button>
          <div className="flex-1 px-4">
            <h2 className="text-xl font-semibold">
              {navigation.find((item) => item.current)?.name || 'Admin'}
            </h2>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminDashboard; 