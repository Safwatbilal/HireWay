'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import destroySession from '@/app/actions/destroySession';
import { useAuth } from '@/store/aviblity';
import { toast } from 'react-toastify';
import { FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    const { success, error } = await destroySession();

    if (success) {
      setIsAuthenticated(false);
      router.push('/login');
    } else {
      toast.error(error);
    }
  };

  const isActive = (path) =>
    pathname === path ? 'text-blue-700 font-semibold' : 'hover:text-blue-600';

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo */}
        <Link href="/" className="mb-4 md:mb-0">
          <span className="text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700">
            Room4U
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex  gap-1 text-xs sm:text-base font-medium mt-2 sm:mt-0">
          <Link href="/" className={`${isActive('/')} px-2`}>
            Home
          </Link>
          <Link href="/house" className={`${isActive('/house')}  mx-1`}>
            Houses
          </Link>
          <Link href="/myhouse" className={`${isActive('/myhouse')} mx-1`}>
            My Houses
          </Link>
          <Link href="/house/add" className={`${isActive('/house/add')} mx-1`}>
            Add House
          </Link>
          <Link href="/housing" className={`${isActive('/housing')} mx-1`}>
            Housing
          </Link>
        </div>
      {/* Auth Links */}
      <div className="flex  gap-2 text-xs sm:text-base mt-2 sm:mt-0">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-700"
          >
            <FaSignOutAlt className="mr-2" />
            Log Out
          </button>
        ) : (
          <>
            <Link href="/login" className={`${isActive('/login')} flex items-center`}>
              <FaSignInAlt className="mr-2" />
              Login
            </Link>
            <Link href="/register" className={`${isActive('/register')} flex items-center`}>
              <FaUser className="mr-2" />
              Register
            </Link>
          </>
        )}
      </div>
      </nav>

    </header>
  );
}
