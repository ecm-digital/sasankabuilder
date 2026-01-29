
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Calculator, Calendar, Home, Book } from 'lucide-react';

export function Layout() {
    return (
        <div className="flex h-screen bg-sasanka-light">
            {/* Sidebar */}
            <aside className="w-64 bg-sasanka-dark text-white flex flex-col">
                <div className="p-6 flex items-center space-x-2">
                    <Home className="h-8 w-8 text-sasanka-green" />
                    <span className="text-xl font-bold">Sasanka Builder</span>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    <NavLink
                        to="/"
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
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`
                        }
                    >
                        <Calendar className="h-5 w-5" />
                        <span>Harmonogram (Scheduler)</span>
                    </NavLink>

                    <NavLink
                        to="/knowledge-base"
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
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
