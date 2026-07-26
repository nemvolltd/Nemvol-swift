import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEcommerce } from '../../context/EcommerceContext';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

export default function Navbar() {
    const location = useLocation();
    const { cart, setIsCartOpen, setIsSearchOpen } = useEcommerce();
    
    // Calculate total quantity of items in cart
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/products' },
        { name: 'Wishlist', href: '/wishlist' },
        { name: 'Profile', href: '/profile' },
    ];

    const activeItem = navItems.find(item => item.href === location.pathname)?.name || 'Home';

    return (
        <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100/85">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
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
