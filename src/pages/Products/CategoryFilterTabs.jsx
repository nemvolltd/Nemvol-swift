import React from 'react';

export default function CategoryFilterTabs({ categories, activeCategory, onCategoryChange }) {
    return (
        <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-10 pb-2 border-b border-slate-100">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`whitespace-nowrap px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors relative ${activeCategory === category
                            ? 'text-slate-900'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                >
                    {category}
                    {activeCategory === category && (
                        <span className="absolute bottom-[-9px] left-0 w-full h-0.5 bg-slate-900"></span>
                    )}
                </button>
            ))}
        </div>
    );
}
