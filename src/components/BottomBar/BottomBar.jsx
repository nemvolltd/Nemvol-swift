import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Heart, Home, ShoppingCart, User } from 'lucide-react';
import useStore from '../../store/useStore';

const NAV_ITEMS = [
    { name: 'Shop',     icon: LayoutGrid,   href: '/products' },
    { name: 'Wishlist', icon: Heart,        href: '/wishlist'  },
    { name: 'Home',     icon: Home,         href: '/',         center: true },
    { name: 'Cart',     icon: ShoppingCart, href: '/cart'      },
    { name: 'Profile',  icon: User,         href: '/profile'   },
];

export default function BottomBar() {
    const location = useLocation();
    const active = location.pathname;
    const openModalsCount = useStore((s) => s.openModalsCount);

    // Hide the nav bar whenever any modal / drawer / overlay is open
    if (openModalsCount > 0) return null;

    return (
        <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2.5rem)] max-w-[340px]">
            <div className="bg-white border border-slate-100/80 rounded-full px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.10)] flex items-center justify-between relative">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.href || (item.href !== '/' && active.startsWith(item.href));

                    if (item.center) {
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="flex items-center justify-center -mt-7"
                                aria-label="Home"
                            >
                                {/* Orange elevated circle */}
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_18px_rgba(249,115,22,0.40)] transition-all ${
                                    isActive
                                        ? 'bg-orange-500 scale-105'
                                        : 'bg-orange-400 hover:bg-orange-500'
                                }`}>
                                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                                </div>
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            aria-label={item.name}
                            className={`flex items-center justify-center w-9 h-9 rounded-full transition-all ${
                                isActive ? 'text-orange-500' : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            <Icon
                                className="w-5 h-5"
                                strokeWidth={isActive ? 2.2 : 1.8}
                                fill={isActive && (item.name === 'Wishlist' || item.name === 'Home') ? 'currentColor' : 'none'}
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
