import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Settings, Bell } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import AdminMobileNav from './AdminMobileNav';
import { useAdminLogout } from '../../../hooks/useAuth';

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAdminLogout();

    const [hasUnread, setHasUnread] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Scroll listener for smart auto-hiding top header
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 60 && currentScrollY > lastScrollY) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        const checkUnread = () => {
            const stored = localStorage.getItem('admin_notifications');
            if (stored) {
                const notifs = JSON.parse(stored);
                setHasUnread(notifs.some(n => !n.read));
            } else {
                setHasUnread(true);
            }
        };
        checkUnread();
        const interval = setInterval(checkUnread, 1500);
        return () => clearInterval(interval);
    }, [location.pathname]);

    // Helper to extract page title dynamically
    const getPageTitle = (pathname) => {
        switch (pathname) {
            case '/admin/overview':
                return 'Welcome, Salung';
            case '/admin/products':
                return 'Products';
            case '/admin/categories':
                return 'Categories';
            case '/admin/orders':
                return 'Orders';
            case '/admin/users':
                return 'Customers';
            case '/admin/settings':
                return 'Settings';
            case '/admin/notifications':
                return 'Notifications';
            case '/admin/profile':
                return 'Profile';
            default:
                return 'Admin Studio';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 flex flex-col md:flex-row text-slate-800">
            {/* ── Desktop Sidebar ── */}
            <AdminSidebar />

            {/* ── Right column: Header + Page Content ── */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* ── Global Top Header Bar (Smart auto-hide on scroll) ── */}
                <header className={`bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 sticky top-0 z-30 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.01)] transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'
                    }`}>
                    <h1 className="text-lg md:text-xl font-black tracking-tight text-slate-900 animate-fadeIn">
                        {getPageTitle(location.pathname)}
                    </h1>

                    <div className="flex items-center gap-2.5 select-none">
                        {/* Notification Bell Circle with Red Dot */}
                        <button
                            onClick={() => navigate('/admin/notifications')}
                            className="relative w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors shadow-sm cursor-pointer border-none"
                            title="Notifications"
                        >
                            <Bell className="w-4 h-4" />
                            {hasUnread && (
                                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500 border border-white" />
                            )}
                        </button>

                        {/* Settings Link */}
                        <button
                            onClick={() => navigate('/admin/settings')}
                            className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-555 transition-all duration-200 cursor-pointer border-none"
                            title="Settings"
                        >
                            <Settings className="w-4 h-4" strokeWidth={1.8} />
                        </button>

                        {/* Divider */}
                        <div className="w-px h-5 bg-slate-200 mx-1 rounded-full" />

                        {/* User Avatar Circle */}
                        <button
                            onClick={() => navigate('/admin/profile')}
                            className="w-9 h-9 rounded-full bg-[#1e293b] hover:bg-slate-800 text-white flex items-center justify-center text-[10px] font-black tracking-wider shadow-sm cursor-pointer border-none transition-all hover:scale-105 active:scale-95"
                            title="Admin Profile"
                        >
                            SA
                        </button>
                    </div>
                </header>

                {/* ── Page content ── */}
                <main className="flex-1 p-4 pb-28 md:p-8">
                    <div className="max-w-6xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* ── Mobile Bottom Navigation (Pass showHeader status or handle internally) ── */}
            <AdminMobileNav isVisible={showHeader} />
        </div>
    );
}
