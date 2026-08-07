import React from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import useStore from '../../store/useStore';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

export default function Navbar() {
    const location = useLocation();
    const { data: cart = [] } = useCart();
    const setIsCartOpen = useStore((s) => s.setIsCartOpen);
    const setIsSearchOpen = useStore((s) => s.setIsSearchOpen);

    // Calculate total quantity of items in cart
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const navItems = [
        { name: 'Home',       href: '/' },
        { name: 'Shop',       href: '/products' },
        { name: 'Wishlist',   href: '/wishlist' },
        { name: 'Orders',     href: '/orders' },
        { name: 'Profile',    href: '/profile' },
    ];

    const activeItem = navItems.find(item => item.href === location.pathname)?.name || 'Home';

    return (
        <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100/85">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <DesktopNavbar
                    navItems={navItems}
                    activeItem={activeItem}
                    cartCount={cartCount}
                    onCartClick={() => setIsCartOpen(true)}
                    onSearchClick={() => setIsSearchOpen(true)}
                />
                <MobileNavbar
                    cartCount={cartCount}
                    onCartClick={() => setIsCartOpen(true)}
                    onSearchClick={() => setIsSearchOpen(true)}
                />
            </div>
        </header>
    );
}
