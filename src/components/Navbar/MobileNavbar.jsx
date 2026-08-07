import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User } from 'lucide-react';

export default function MobileNavbar({ cartCount, onCartClick, onSearchClick }) {
    const location = useLocation();

    // On the home page, HomeTopBar handles the top controls — hide this navbar
    if (location.pathname === '/') return null;

    return (
        <div className="md:hidden flex items-center justify-between h-16 w-full px-1 bg-transparent">
            {/* Logo */}
            <Link 
                to="/" 
                className="flex items-center gap-2.5 hover:opacity-90 active:scale-95 duration-200 transition-all select-none"
            >
                <div className="w-8.5 h-8.5 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-sm">
                    N
                </div>
                <span className="text-sm font-bold tracking-tight text-slate-900">Nemvol</span>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-1">
                <button 
                    onClick={onSearchClick}
                    className="p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-50 active:scale-95 duration-200" 
                    aria-label="Search"
                >
                    <Search className="w-5 h-5" strokeWidth={1.8} />
                </button>
                <Link 
                    to="/profile" 
                    className="p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-50 active:scale-95 duration-200" 
                    aria-label="Profile"
                >
                    <User className="w-5 h-5" strokeWidth={1.8} />
                </Link>
                <button
                    onClick={onCartClick}
                    className="relative p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-50 active:scale-95 duration-200"
                    aria-label="Cart"
                >
                    <ShoppingBag className="w-5 h-5" strokeWidth={1.8} />
                    {cartCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 bg-slate-900 text-white text-[8px] font-black rounded-full flex items-center justify-center border border-white animate-pulse">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}
