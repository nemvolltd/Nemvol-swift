import React from 'react';
import { Plus, Search } from 'lucide-react';

export default function CategoryHeader({
    searchQuery,
    onSearchChange,
    onAddClick
}) {
    return (
        <div className="flex flex-col gap-4 select-none">
            {/* ── Search and Add Row ── */}
            <div className="flex items-center gap-2">
                {/* Search Bar */}
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search categories..."
                        className="w-full h-11 pl-11 pr-4 bg-white/70 focus:bg-white text-slate-800 text-xs font-bold rounded-xl border border-slate-100/60 focus:border-slate-350 focus:outline-none transition-all placeholder:text-slate-400 placeholder:font-semibold"
                    />
                </div>

                {/* Add Category Button */}
                <button
                    onClick={onAddClick}
                    className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer shrink-0"
                    title="Add New Category"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
