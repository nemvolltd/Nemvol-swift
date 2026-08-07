import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    ArrowLeft,
    LogOut,
    FolderTree,
} from 'lucide-react';
import { useAdminLogout } from '../../../hooks/useAuth';

const NAV_ITEMS = [
    { path: '/admin/overview',    label: 'Overview',    icon: LayoutDashboard },
    { path: '/admin/products',    label: 'Products',    icon: Package },
    { path: '/admin/categories',  label: 'Categories',  icon: FolderTree },
    { path: '/admin/orders',      label: 'Orders',      icon: ShoppingCart },
    { path: '/admin/users',       label: 'Customers',   icon: Users },
];

export default function AdminSidebar() {
    const navigate   = useNavigate();
    const location   = useLocation();
    const { logout } = useAdminLogout();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-100 p-6 sticky top-0 h-screen z-30 shrink-0">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
                <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-600/20">
                    A
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900 leading-none">Admin Studio</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Management</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1 flex-1">
                {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
                    <button
                        key={path}
                        onClick={() => navigate(path)}
                        className={`h-11 px-4 rounded-xl flex items-center gap-3 text-xs font-black uppercase tracking-wider transition-all w-full text-left cursor-pointer ${
                            isActive(path)
                                ? 'bg-slate-950 text-white shadow-sm'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                    >
                        <Icon className="w-4 h-4 shrink-0" />
                        {label}
                    </button>
                ))}
            </nav>

            {/* Bottom actions */}
            <div className="flex flex-col gap-1 pt-4 border-t border-slate-100">
                <button
                    onClick={() => navigate('/')}
                    className="h-11 px-4 rounded-xl flex items-center gap-3 text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 uppercase tracking-wider transition-colors w-full"
                >
                    <ArrowLeft className="w-4 h-4 shrink-0" />
                    Main Storefront
                </button>
                <button
                    onClick={handleLogout}
                    className="h-11 px-4 rounded-xl flex items-center gap-3 text-xs font-bold text-red-500 hover:bg-red-50 hover:text-red-600 uppercase tracking-wider transition-colors w-full"
                >
                    <LogOut className="w-4 h-4 shrink-0" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
