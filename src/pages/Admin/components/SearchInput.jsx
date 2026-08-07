import React from 'react';
import { Search } from 'lucide-react';

export default function SearchInput({ value, onChange, placeholder = 'Search...' }) {
    return (
        <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full h-11 pl-11 pr-4 bg-white border border-slate-200/80 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 shadow-[0_2px_4px_rgba(0,0,0,0.01)] transition-all"
            />
        </div>
    );
}
