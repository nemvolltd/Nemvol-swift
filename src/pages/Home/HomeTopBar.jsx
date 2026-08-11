import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, LayoutGrid, SlidersHorizontal } from 'lucide-react';

export default function HomeTopBar({ onFilterClick }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/products?search=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div className="w-full flex flex-col gap-3 pt-2 pb-4 md:hidden">
            {/* ── Row 1: Brand icon + Notification ── */}
            <div className="flex items-center justify-between">
                {/* Grid / Menu icon */}
                <button
                    onClick={() => navigate('/products')}
                    className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer"
                    aria-label="Browse categories"
                >
                    <LayoutGrid className="w-5 h-5" strokeWidth={1.8} />
                </button>

                {/* Notification Bell */}
                <button
                    onClick={() => navigate('/notifications')}
                    className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 transition-colors border-none bg-transparent cursor-pointer relative"
                    aria-label="Notifications"
                >
                    <Bell className="w-5 h-5" strokeWidth={1.8} />
                    {/* Notification badge */}
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-white" />
                </button>
            </div>

            {/* ── Row 2: Search bar + Filter icon ── */}
            <form onSubmit={handleSearch} className="flex items-center gap-2">
                {/* Search input */}
                <div className="flex-1 flex items-center gap-2.5 h-11 px-3.5 bg-slate-100/80 hover:bg-slate-100 border border-slate-200/60 rounded-xl transition-colors">
                    <Search className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={1.8} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search..."
                        className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder-slate-400 font-normal focus:outline-none"
                    />
                    {/* Vertical divider + filter shortcut inside bar */}
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-px h-4 bg-slate-300" />
                        <button
                            type="button"
                            onClick={onFilterClick}
                            className="p-1 text-slate-500 hover:text-slate-700 cursor-pointer border-none bg-transparent"
                            aria-label="Filter"
                        >
                            <SlidersHorizontal className="w-4 h-4" strokeWidth={1.8} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
