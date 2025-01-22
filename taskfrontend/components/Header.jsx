'use client';
import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout } from '@/store/auth';

const Header = () => {
    const path = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const company = useSelector((state) => state.auth.company);
    const isLoggedIn = !!user || !!company;
   // console.log(path)
   
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedCompany = localStorage.getItem('company');
      
        if (storedUser) {
            dispatch(setUser(storedUser));
        }
        if (storedCompany) {
            dispatch(setUser(storedCompany));
        }
    
    }, [dispatch, router]);
    const isActive = (linkPath) => {
        return path === linkPath ? 'bg-second' : 'bg-bgSecond';
    };
    const handleLogout = () => {
     
        dispatch(logout());
        router.push('/'); 
    };

    return (
        <header className="py-4 text-white">
            <div className="container mx-auto flex justify-between items-center lg:flex-row md:flex-row flex-col gap-4">
                <h1 className="text-3xl font-extrabold text-white">
                    <Link href="/">HireWay</Link>
                </h1>
                <nav className="flex items-center space-x-6">
                    {!isLoggedIn ? (
                        <>
                            <Link href="/login/user">
                                <div className={`buttonHeader ${isActive('/login/user')} ${isActive('/signup/user')}`}>
                                    Login as User
                                </div>
                            </Link>
                            <Link href="/login/company">
                                <div className={`buttonHeader ${isActive('/login/company')} ${isActive('/signup/company')}`}>
                                    Login as Employer
                                </div>
                            </Link>
                        </>
                    ) : (
                        <>
                            {company === 'company' && (
                                <>
                                    <Link href="/add-job">
                                        <div className={`buttonHeader ${isActive('/add-job')}`}>
                                            Add Job
                                        </div>
                                    </Link>
                                    <Link href="/Myjob">
                                        <div className={`buttonHeader ${isActive('/Myjob')}`}>
                                            My Job
                                        </div>
                                    </Link>
                                </>
                            )}
                            {user === 'user' && (
                                <>
                                
                                <Link href="/alljob">
                                    <div className={`buttonHeader ${isActive('/alljob')}`}>
                                        All Job
                                    </div>
                                </Link>
                            
                            </>
                            )}
                            <button onClick={handleLogout} className="logout">
                                Logout
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
