import React from 'react';
import { useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Heart, User } from 'lucide-react';
import BottomBarItem from './BottomBarItem';

export default function BottomBar() {
    const location = useLocation();

    const navItems = [
        { name: 'Home', icon: Home, href: '/' },
        { name: 'Shop', icon: ShoppingBag, href: '/products' },
        { name: 'Wishlist', icon: Heart, href: '/wishlist' },
        { name: 'Profile', icon: User, href: '/profile' },
    ];

    const activeItem = navItems.find(item => item.href === location.pathname)?.name || 'Home';

    return (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm">
            <div className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-full px-3 py-2 shadow-[0_12px_32px_rgba(0,0,0,0.08)] flex items-center justify-around">
                {navItems.map((item) => (
                    <BottomBarItem
                        key={item.name}
                        name={item.name}
                        icon={item.icon}
                        href={item.href}
                        isActive={activeItem === item.name}
                    />
                ))}
            </div>
        </div>
    );
}

