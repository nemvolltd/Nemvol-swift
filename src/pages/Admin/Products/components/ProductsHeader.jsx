import React, { useState } from 'react';
import { ChevronDown, SlidersHorizontal, Plus, Search } from 'lucide-react';

export default function ProductsHeader({
    searchQuery,
    onSearchChange,
    onAddClick,
    selectedCategory,
    onCategoryChange,
    selectedStatus,
    onStatusChange,
    categories = []
}) {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    const statuses = ['All Status', 'Active', 'Out of Stock'];

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
                        placeholder="Search products..."
                        className="w-full h-11 pl-11 pr-4 bg-white/70 focus:bg-white text-slate-800 text-xs font-bold rounded-xl border border-slate-100/60 focus:border-slate-355 focus:outline-none transition-all placeholder:text-slate-400 placeholder:font-semibold"
                    />
                </div>

                {/* Filter Settings Button */}
                <button className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-650 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer shrink-0">
                    <SlidersHorizontal className="w-4 h-4" />
                </button>

                {/* Add Product Button (represented by the Plus/Scan layout) */}
                <button
                    onClick={onAddClick}
                    className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer shrink-0"
                    title="Add New Product"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            {/* ── Filter Pills Row (Status & Category Dropdowns) ── */}
            <div className="flex items-center gap-2 relative">
                
                {/* Status Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setIsStatusOpen(!isStatusOpen);
                            setIsCategoryOpen(false);
                        }}
                        className={`h-8 px-4.5 rounded-lg border text-[10px] font-extrabold tracking-wide uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                            selectedStatus !== 'All Status'
                                ? 'bg-black border-black text-white'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        <span>{selectedStatus}</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {isStatusOpen && (
                        <div className="absolute left-0 mt-1.5 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-20 p-1.5 animate-fadeIn">
                            {statuses.map((st) => (
                                <button
                                    key={st}
                                    onClick={() => {
                                        onStatusChange(st);
                                        setIsStatusOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                                >
                                    {st}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Category Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setIsCategoryOpen(!isCategoryOpen);
                            setIsStatusOpen(false);
                        }}
                        className={`h-8 px-4.5 rounded-lg border text-[10px] font-extrabold tracking-wide uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                            selectedCategory !== 'All Categories'
                                ? 'bg-black border-black text-white'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        <span>{selectedCategory}</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {isCategoryOpen && (
                        <div className="absolute left-0 mt-1.5 w-44 bg-white border border-slate-100 rounded-xl shadow-lg z-20 p-1.5 animate-fadeIn">
                            {['All Categories', ...categories].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        onCategoryChange(cat);
                                        setIsCategoryOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
