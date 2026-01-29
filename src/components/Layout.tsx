
import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calculator, Calendar, Home, Book, Menu, X, Construction } from 'lucide-react';

export function Layout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <div className="flex h-screen bg-sasanka-light relative">
            {/* Mobile Header */}
            <div className="lg:hidden absolute top-0 left-0 right-0 bg-sasanka-dark text-white p-4 flex justify-between items-center z-20">
                <div className="flex items-center space-x-2">
                    <Home className="h-6 w-6 text-sasanka-green" />
                    <span className="text-lg font-bold">Sasanka Builder</span>
                </div>
                <button onClick={toggleMenu} className="p-2">
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Sidebar Overlay for Mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={closeMenu}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                absolute lg:relative top-0 left-0 h-full w-64 bg-sasanka-dark text-white flex flex-col z-40 transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 flex items-center space-x-2 hidden lg:flex">
                    <Home className="h-8 w-8 text-sasanka-green" />
                    <span className="text-xl font-bold">Sasanka Builder</span>
                </div>

                {/* Mobile Menu Header inside Sidebar */}
                <div className="p-4 flex items-center justify-between lg:hidden border-b border-white/10">
                    <span className="font-bold text-lg">Menu</span>
                    <button onClick={closeMenu}>
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2 mt-14 lg:mt-0">
                    <NavLink
                        to="/"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`
                        }
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/estimator"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`
                        }
                    >
                        <Calculator className="h-5 w-5" />
                        <span>Wyceny (Estimator)</span>
                    </NavLink>

                    <NavLink
                        to="/scheduler"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`
                        }
                    >
                        <Calendar className="h-5 w-5" />
                        <span>Harmonogram (Scheduler)</span>
                    </NavLink>

                    <NavLink
                        to="/helper"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`
                        }
                    >
                        <Construction className="h-5 w-5" />
                        <span>Pomocnik Budowy</span>
                    </NavLink>

                    <NavLink
                        to="/knowledge-base"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`
                        }
                    >
                        <Book className="h-5 w-5" />
                        <span>Baza Wiedzy</span>
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="text-sm text-gray-400">v0.1.0 Alpha</div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto w-full pt-16 lg:pt-0">
                <div className="p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
