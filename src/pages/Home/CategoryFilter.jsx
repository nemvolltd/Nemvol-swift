import React from 'react';

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
    return (
        <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-8 pb-2">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded text-xs md:text-sm font-semibold transition-colors ${activeCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
