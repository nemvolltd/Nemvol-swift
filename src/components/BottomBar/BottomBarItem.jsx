import React from 'react';
import { Link } from 'react-router-dom';

export default function BottomBarItem({ name, icon: Icon, href, isActive }) {
    return (
        <Link
            to={href}
            className="flex flex-col items-center justify-center w-16 select-none"
        >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${isActive
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-110 -translate-y-1'
                : 'text-slate-400 bg-transparent'
                }`}
            >
                <Icon
                    className="w-[18px] h-[18px] transition-transform duration-300"
                    strokeWidth={isActive ? 2.2 : 1.5}
                />
            </div>
            <span
                className={`text-[9px] font-bold tracking-widest mt-1 transition-all duration-300 uppercase ${isActive 
                    ? 'text-blue-600 scale-105 opacity-100' 
                    : 'text-slate-400 opacity-90'
                }`}
            >
                {name}
            </span>
        </Link>
    );
}
