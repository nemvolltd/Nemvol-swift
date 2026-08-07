import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag } from 'lucide-react';

export default function DesktopNavbar({ navItems, activeItem, cartCount, onCartClick, onSearchClick }) {
    return (
        <div className="hidden md:flex items-center justify-between h-[68px] w-full bg-transparent">

            {/* Left: Logo */}
            <div className="flex items-center select-none shrink-0">
                <Link to="/" className="flex items-center gap-3 hover:opacity-85 transition-opacity duration-300">
                    <img
                        src={`${import.meta.env.BASE_URL}image.svg`}
                        alt="Nemvol Logo"
                        className="w-8 h-8 object-contain"
                    />
                    <span className="text-[15px] font-black tracking-[0.2em] text-slate-900 uppercase">Nemvol</span>
                </Link>
            </div>

            {/* Center: Nav Links */}
            <nav className="flex items-center gap-1 h-full absolute left-1/2 -translate-x-1/2">
                {navItems.map((item) => {
                    const isActive = activeItem === item.name;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`relative px-4 h-full flex items-center text-[11px] font-bold tracking-[0.13em] uppercase transition-all duration-300 group ${
                                isActive ? 'text-slate-900' : 'text-slate-400 hover:text-slate-700'
                            }`}
                        >
                            {item.name}
                            {/* Active underline */}
                            <span
                                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full bg-slate-900 transition-all duration-300 ${
                                    isActive ? 'w-5' : 'w-0 group-hover:w-3 group-hover:bg-slate-300'
                                }`}
                            />
                        </Link>
                    );
                })}
            </nav>

            {/* Right: Icon Actions */}
            <div className="flex items-center gap-1 shrink-0">
                <button
                    onClick={onSearchClick}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                    aria-label="Search"
                >
                    <Search className="w-[17px] h-[17px]" strokeWidth={1.8} />
                </button>
                <Link
                    to="/profile"
                    className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                    aria-label="Account"
                >
                    <User className="w-[17px] h-[17px]" strokeWidth={1.8} />
                </Link>
                <button
                    onClick={onCartClick}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 relative"
                    aria-label="Cart"
                >
                    <ShoppingBag className="w-[17px] h-[17px]" strokeWidth={1.8} />
                    {cartCount > 0 && (
                        <span className="absolute top-1 right-1 w-[15px] h-[15px] bg-slate-900 text-white text-[8px] font-black rounded-full flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}
