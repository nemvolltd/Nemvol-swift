import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User } from 'lucide-react';

export default function MobileNavbar({ cartCount, onCartClick, onSearchClick }) {
    return (
        <div className="md:hidden flex items-center justify-between h-16 w-full px-1 bg-transparent">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                <img src={`${import.meta.env.BASE_URL}image.svg`} alt="Nemvol Logo" className="w-8 h-8 object-contain" />
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-1">
                <button 
                    onClick={onSearchClick}
                    className="p-2 text-slate-500 hover:text-slate-900 transition-colors" 
                    aria-label="Search"
                >
                    <Search className="w-5 h-5" strokeWidth={1.5} />
                </button>
                <Link to="/profile" className="p-2 text-slate-500 hover:text-slate-900 transition-colors" aria-label="Profile">
                    <User className="w-5 h-5" strokeWidth={1.5} />
                </Link>
                <button
                    onClick={onCartClick}
                    className="relative p-2 text-slate-500 hover:text-slate-900 transition-colors"
                    aria-label="Cart"
                >
                    <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                    {cartCount > 0 && (
                        <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}
