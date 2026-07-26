import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag } from 'lucide-react';

export default function DesktopNavbar({ navItems, activeItem, cartCount, onCartClick, onSearchClick }) {
    return (
        <div className="hidden md:flex items-center justify-between h-16 w-full bg-transparent">
            {/* Left Section: Logo & Brand Name */}
            <div className="flex items-center select-none">
                <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity duration-300">
                    <img src={`${import.meta.env.BASE_URL}image.svg`} alt="Nemvol Logo" className="w-8 h-8 object-contain" />
                    <span className="text-base font-black tracking-widest text-slate-900">NEMVOL</span>
                </Link>
            </div>

            {/* Middle Section: Navigation Links */}
            <nav className="flex items-center gap-8 h-full">
                {navItems.map((item) => {
                    const isActive = activeItem === item.name;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`text-xs tracking-widest font-semibold transition-all duration-300 relative h-full flex items-center px-1 border-b-2 ${isActive ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-900'
                                }`}
                        >
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-5">
                <button 
                    onClick={onSearchClick}
                    className="p-2 text-slate-500 hover:text-slate-900 transition-colors duration-300" 
                    aria-label="Search"
                >
                    <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </button>
                <Link 
                    to="/profile" 
                    className="p-2 text-slate-500 hover:text-slate-900 transition-colors duration-300" 
                    aria-label="Account"
                >
                    <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </Link>
                <button
                    onClick={onCartClick}
                    className="p-2 text-slate-500 hover:text-slate-900 transition-colors duration-300 relative"
                    aria-label="Cart"
                >
                    <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    {cartCount > 0 && (
                        <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}
