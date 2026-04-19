import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, MessageSquare, Star, ChevronRight } from 'lucide-react';

const NavDropdown = ({ title, badge, items, isActive }) => (
    <div className="relative group h-full flex items-center">
        <button
            className={`flex items-center space-x-1 text-sm font-medium transition-colors h-full px-3 py-2 rounded-md
            ${isActive ? 'text-primary-600 bg-primary-50/50' : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'}`}
        >
            <span>{title}</span>
            {badge && (
                <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold ml-1 flex items-center justify-center">
                    {badge}
                </span>
            )}
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
        </button>

        {/* Dropdown Menu */}
        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 hidden group-hover:block animate-fade-in-up transform origin-top-left z-50">
            {items.map((item, idx) => (
                <Link
                    key={idx}
                    to={item.href}
                    className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary-600 transition-colors flex items-center group/item"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-2 group-hover/item:bg-primary-500 transition-colors"></span>
                    {item.label}
                </Link>
            ))}
        </div>
    </div>
);

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isActive = (path) => location.pathname === path;

    // Navigation Data
    const internshipItems = [
        { label: 'Top Companies', href: '/jobs' },
        { label: 'By Location', href: '/jobs' },
        { label: 'By Category', href: '/jobs' },
        { label: 'View All Internships', href: '/jobs' },
    ];

    const courseItems = [
        { label: 'Web Development', href: '#' },
        { label: 'Data Science', href: '#' },
        { label: 'UI/UX Design', href: '#' },
        { label: 'Digital Marketing', href: '#' },
    ];

    const jobItems = [
        { label: 'Full-time Jobs', href: '/jobs' },
        { label: 'Part-time Jobs', href: '/jobs' },
        { label: 'Remote Opportunities', href: '/jobs' },
        { label: 'Startup Jobs', href: '/jobs' },
    ];

    return (
        <nav className="fixed w-full z-50 glass border-b border-gray-200/50">
            <div className="container mx-auto px-6 h-16 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-indigo-700 flex items-center justify-center text-white shadow-xl relative z-10 transition-transform group-hover:scale-105 duration-300">
                            <span className="font-['Outfit'] font-bold text-2xl tracking-tighter">i</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center -space-y-1">
                        <span className="font-['Outfit'] text-2xl font-bold text-slate-900 tracking-tight group-hover:text-primary-700 transition-colors">
                            intersy
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold group-hover:text-primary-500 transition-colors pl-0.5">
                            Recruit
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-1">
                    <NavDropdown
                        title="Internships"
                        items={internshipItems}
                        isActive={location.pathname === '/jobs'}
                    />
                    <NavDropdown
                        title="Courses"
                        badge="OFFER"
                        items={courseItems}
                        isActive={false}
                    />
                    <NavDropdown
                        title="Jobs"
                        items={jobItems}
                        isActive={false}
                    />
                </div>

                {/* Right Side Actions */}
                <div className="hidden md:flex items-center space-x-5">
                    {/* Chat Icon */}
                    <button className="text-slate-500 hover:text-primary-600 transition-colors relative group">
                        <MessageSquare className="w-6 h-6" />
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                    </button>

                    <div className="h-6 w-px bg-slate-200"></div>

                    {user ? (
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-3 focus:outline-none group"
                            >
                                <div className="text-right hidden lg:block">
                                    <p className="text-sm font-semibold text-slate-700 group-hover:text-primary-700 transition-colors">{user.name}</p>
                                    <p className="text-xs text-slate-500">Student</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-indigo-100 flex items-center justify-center text-primary-700 font-bold text-base ring-2 ring-white shadow-sm group-hover:ring-primary-100 transition-all">
                                    {user.name ? user.name[0].toUpperCase() : 'U'}
                                </div>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl border border-gray-100 animate-fade-in-up origin-top-right overflow-hidden z-[100]">
                                    {/* User Header */}
                                    <div className="px-6 py-4 border-b border-gray-100">
                                        <p className="text-base font-bold text-slate-800">{user.name}</p>
                                        <p className="text-sm text-slate-500">{user.email}</p>
                                    </div>

                                    {/* Rating / Know More */}
                                    <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group/rating">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-yellow-400 text-white p-1 rounded-full shadow-sm">
                                                <Star className="w-3 h-3 fill-current" />
                                            </div>
                                            <span className="font-bold text-slate-700">4</span>
                                        </div>
                                        <div className="flex items-center text-primary-600 text-sm font-semibold group-hover/rating:text-primary-700">
                                            <span>Know More</span>
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-2">
                                        <Link
                                            to="/"
                                            onClick={() => setIsProfileOpen(false)}
                                            className="block px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 transition-colors"
                                        >
                                            Home
                                        </Link>
                                        <Link
                                            to="/dashboard"
                                            onClick={() => setIsProfileOpen(false)}
                                            className="block px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 transition-colors"
                                        >
                                            My Applications
                                        </Link>
                                        <button className="w-full text-left px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 transition-colors">
                                            My Bookmarks
                                        </button>
                                        <button className="w-full text-left px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 transition-colors">
                                            Edit Resume
                                        </button>
                                        <button className="w-full text-left px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 transition-colors">
                                            Edit Preferences
                                        </button>

                                        <div className="my-1 border-t border-gray-100"></div>

                                        <button className="w-full text-left px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 transition-colors">
                                            Safety Tips
                                        </button>
                                        <button className="w-full text-left px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 transition-colors">
                                            Help Center
                                        </button>

                                        <button
                                            className="w-full flex items-center justify-between px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 transition-colors"
                                            onClick={handleLogout}
                                        >
                                            <span>Sign Out</span>
                                            <LogOut className="w-4 h-4" />
                                        </button>

                                        <button className="w-full flex items-center justify-between px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 transition-colors">
                                            <span>More</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link
                                to="/login"
                                className="text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors px-4 py-2"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/register"
                                className="px-5 py-2.5 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-lg shadow-primary-200 transition-all hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <button className="text-slate-500">
                        <MessageSquare className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-slate-600 hover:text-primary-600 focus:outline-none p-2 bg-slate-50 rounded-lg"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-xl animate-fade-in-down max-h-[calc(100vh-4rem)] overflow-y-auto">
                    <div className="p-4 space-y-4">
                        <div className="space-y-2">
                            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Explore</p>
                            <Link to="/jobs" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl bg-slate-50 text-slate-700 font-medium hover:bg-primary-50 hover:text-primary-700">
                                Internships
                            </Link>
                            <Link to="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 text-slate-700 font-medium hover:bg-primary-50 hover:text-primary-700">
                                <span>Courses</span>
                                <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">OFFER</span>
                            </Link>
                            <Link to="/jobs" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl bg-slate-50 text-slate-700 font-medium hover:bg-primary-50 hover:text-primary-700">
                                Jobs
                            </Link>
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                            {user ? (
                                <>
                                    <div className="flex items-center px-4 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg mr-3">
                                            {user.name ? user.name[0].toUpperCase() : 'U'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{user.name}</p>
                                            <p className="text-xs text-slate-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-3 text-slate-600 font-medium hover:text-primary-600">
                                        <LayoutDashboard className="w-5 h-5 mr-3" />
                                        Dashboard
                                    </Link>
                                    <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl">
                                        <LogOut className="w-5 h-5 mr-3" />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 text-slate-600 font-bold border border-gray-200 rounded-xl hover:bg-gray-50">
                                        Log In
                                    </Link>
                                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 text-white bg-primary-600 font-bold rounded-xl hover:bg-primary-700 shadow-md">
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
