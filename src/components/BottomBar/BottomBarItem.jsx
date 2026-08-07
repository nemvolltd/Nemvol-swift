import React from 'react';
import { Link } from 'react-router-dom';

export default function BottomBarItem({ name, icon: Icon, href, isActive }) {
    return (
        <Link
            to={href}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full transition-all duration-300 select-none ${isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-950/10'
                    : 'text-slate-400 hover:text-slate-600 bg-transparent'
                }`}
        >
            <Icon
                className="w-4.5 h-4.5 transition-transform duration-300"
                strokeWidth={isActive ? 2.2 : 1.8}
            />
            <span
                className={`text-[9px] font-bold tracking-wider uppercase transition-all duration-300 overflow-hidden whitespace-nowrap ${isActive ? 'max-w-16 opacity-100' : 'max-w-0 opacity-0'
                    }`}
            >
                {name}
            </span>
        </Link>
    );
}

