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
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 pb-safe pt-2.5 px-6 z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between h-14 max-w-md mx-auto">
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
