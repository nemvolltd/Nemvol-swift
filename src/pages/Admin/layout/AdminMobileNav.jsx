import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    FolderTree,
    LogOut,
} from 'lucide-react';

const NAV_ITEMS = [
    { path: '/admin/overview',   label: 'Overview',    icon: LayoutDashboard },
    { path: '/admin/products',   label: 'Products',    icon: Package },
    { path: '/admin/categories', label: 'Categories',  icon: FolderTree },
    { path: '/admin/orders',     label: 'Orders',      icon: ShoppingCart },
    { path: '/admin/users',      label: 'Users',       icon: Users },
];

export default function AdminMobileNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
            <div
                className="flex items-center gap-1 px-2.5 py-2.5 rounded-full
                           bg-white/75 backdrop-blur-2xl
                           shadow-[0_8px_32px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.06)]
                           border border-white/60"
            >
                {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
                    const active = isActive(path);
                    return (
                        <button
                            key={path}
                            onClick={() => navigate(path)}
                            title={label}
                            aria-label={label}
                            className={`
                                relative w-11 h-11 flex items-center justify-center rounded-full
                                transition-all duration-300 select-none
                                ${active
                                    ? 'bg-slate-900 text-white shadow-[0_4px_12px_rgba(15,23,42,0.25)] scale-105'
                                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 active:scale-95'
                                }
                            `}
                        >
                            <Icon
                                className="w-[18px] h-[18px] transition-transform duration-200"
                                strokeWidth={active ? 2.2 : 1.8}
                            />
                        </button>
                    );
                })}

                {/* Divider */}
                <div className="w-px h-5 bg-slate-200 mx-0.5 rounded-full" />

                {/* Exit / Logout */}
                <button
                    onClick={() => navigate('/')}
                    title="Exit Admin"
                    aria-label="Exit Admin"
                    className="w-11 h-11 flex items-center justify-center rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50/80 active:scale-95 transition-all duration-200 select-none"
                >
                    <LogOut className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </button>
            </div>
        </div>
    );
}
