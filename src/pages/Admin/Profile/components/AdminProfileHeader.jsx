import React from 'react';
import { ArrowLeft, Search } from 'lucide-react';

export default function AdminProfileHeader({ onBackClick, onSearchClick }) {
    return (
        <div className="flex items-center justify-between px-4 py-5 bg-transparent">
            <button 
                onClick={onBackClick}
                className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-650 transition-colors cursor-pointer"
                aria-label="Go Back"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base font-semibold text-slate-800 tracking-tight">Profile</h1>
            <button 
                onClick={onSearchClick}
                className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-650 transition-colors cursor-pointer"
                aria-label="Search"
            >
                <Search className="w-5 h-5" />
            </button>
        </div>
    );
}
