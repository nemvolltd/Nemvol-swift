import React from 'react';
import { 
    Shirt, 
    Sparkles, 
    Watch, 
    ShoppingBag, 
    Footprints, 
    LayoutGrid,
    Tag
} from 'lucide-react';

const CATEGORY_ICONS = {
    'All': LayoutGrid,
    'Shoes': Footprints,
    'Beauty': Sparkles,
    "Women's Fashion": Sparkles,
    'Jewelry': Sparkles,
    "Men's Fashion": Shirt,
    'Dresses': Shirt,
    'Shirts': Shirt,
    'Jeans': Shirt,
    'Blazers': Shirt,
    'Children Wear': Shirt,
    'Bags': ShoppingBag,
    'Watches': Watch
};

export default function CategoryFilterTabs({ categories, activeCategory, onCategoryChange }) {
    return (
        <div className="flex overflow-x-auto hide-scrollbar gap-5 mb-8 pb-3 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center md:flex-wrap">
            {categories.map((category) => {
                const isActive = activeCategory === category;
                // Fallback to Tag icon if category icon is not predefined
                const IconComponent = CATEGORY_ICONS[category] || Tag;

                return (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className="flex flex-col items-center gap-2 shrink-0 bg-transparent border-none cursor-pointer group"
                    >
                        {/* Rounded square container for icon */}
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                            isActive
                                ? 'bg-orange-50 border-orange-500 text-orange-500 shadow-[0_4px_12px_rgba(249,115,22,0.12)]'
                                : 'bg-white border-slate-100 text-slate-400 group-hover:border-slate-200 group-hover:text-slate-600'
                        }`}>
                            <IconComponent className="w-5 h-5" strokeWidth={1.8} />
                        </div>

                        {/* Title text */}
                        <span className={`text-[10px] md:text-xs font-bold transition-colors tracking-wide ${
                            isActive ? 'text-orange-500' : 'text-slate-400 group-hover:text-slate-650'
                        }`}>
                            {category}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
