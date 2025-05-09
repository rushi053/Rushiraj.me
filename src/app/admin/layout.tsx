'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

// Sidebar component for navigation
function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  // Only show sidebar if not on login page
  if (pathname === '/admin/login') return null;

  return (
    <aside className="w-64 bg-primary-westar dark:bg-primary-black h-screen fixed left-0 top-0 border-r border-primary-sand dark:border-primary-dark-grey">
      <div className="p-6">
        <h2 className="text-xl font-semibold tracking-tight text-primary-black dark:text-primary-off-white">Admin Panel</h2>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/admin/dashboard"
              className={`flex items-center px-6 py-2.5 text-sm ${
                pathname === '/admin/dashboard'
                  ? 'bg-primary-sand dark:bg-primary-dark-grey text-primary-black dark:text-primary-off-white'
                  : 'text-primary-dark-grey dark:text-primary-westar hover:bg-primary-sand dark:hover:bg-primary-dark-grey'
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/admin/apps"
              className={`flex items-center px-6 py-2.5 text-sm ${
                pathname === '/admin/apps' || pathname.startsWith('/admin/apps/')
                  ? 'bg-primary-sand dark:bg-primary-dark-grey text-primary-black dark:text-primary-off-white'
                  : 'text-primary-dark-grey dark:text-primary-westar hover:bg-primary-sand dark:hover:bg-primary-dark-grey'
              }`}
            >
              iOS Apps
            </Link>
          </li>
          <li>
            <Link
              href="/admin/blog"
              className={`flex items-center px-6 py-2.5 text-sm ${
                pathname === '/admin/blog' || pathname.startsWith('/admin/blog/')
                  ? 'bg-primary-sand dark:bg-primary-dark-grey text-primary-black dark:text-primary-off-white'
                  : 'text-primary-dark-grey dark:text-primary-westar hover:bg-primary-sand dark:hover:bg-primary-dark-grey'
              }`}
            >
              Blog Posts
            </Link>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-6 border-t border-primary-sand dark:border-primary-dark-grey">
        <button 
          onClick={signOut}
          className="text-sm text-primary-dark-grey dark:text-primary-westar hover:text-primary-black dark:hover:text-primary-off-white"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}

// Header component
function Header() {
  const { user } = useAuth();
  const pathname = usePathname();
  
  // Don't show header on login page
  if (pathname === '/admin/login') return null;
  
  return (
    <header className="h-16 fixed top-0 left-64 right-0 bg-primary-off-white dark:bg-primary-black border-b border-primary-sand dark:border-primary-dark-grey flex items-center justify-between px-6 z-10">
      <div>
        <h1 className="text-lg font-medium text-primary-black dark:text-primary-off-white">
          {pathname === '/admin/dashboard' && 'Dashboard'}
          {pathname === '/admin/apps' && 'iOS Apps'}
          {pathname === '/admin/blog' && 'Blog Posts'}
          {pathname.startsWith('/admin/apps/') && 'Edit App'}
          {pathname.startsWith('/admin/blog/') && 'Edit Blog Post'}
        </h1>
      </div>
      {user && (
        <div className="flex items-center">
          <span className="text-sm text-primary-dark-grey dark:text-primary-westar mr-4">
            {user.email}
          </span>
        </div>
      )}
    </header>
  );
}

// AdminLayout wraps all admin pages
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <AuthProvider>
      <div className="min-h-screen bg-primary-off-white dark:bg-primary-black">
        <Sidebar />
        <Header />
        <main className={isLoginPage ? '' : 'ml-64 pt-16 min-h-screen'}>
          {children}
        </main>
      </div>
    </AuthProvider>
  );
} 