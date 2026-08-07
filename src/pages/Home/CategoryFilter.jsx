import React from 'react';

// Placeholder category images — fallback circular thumbnails matching mockup style
const CATEGORY_IMAGES = {
    'All':             'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=120',
    'Shoes':           'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=120',
    'Beauty':          'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=120',
    "Women's Fashion": 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=120',
    'Jewelry':         'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=120',
    "Men's Fashion":   'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=120',
    'Dresses':         'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&q=80&w=120',
    'Shirts':          'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=120',
    'Jeans':           'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=120',
    'Blazers':         'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=120',
    'Children Wear':   'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&q=80&w=120',
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=120';

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
    return (
        <div className="flex overflow-x-auto hide-scrollbar gap-4 md:gap-8 md:justify-center md:flex-wrap mb-8 pb-1 -mx-1 px-1">
            {categories.map((category) => {
                const isActive = activeCategory === category;
                const imgSrc = CATEGORY_IMAGES[category] || FALLBACK_IMAGE;

                return (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className="flex flex-col items-center gap-2 shrink-0 bg-transparent border-none cursor-pointer group"
                    >
                        {/* Circular image */}
                        <div className={`w-[62px] h-[62px] rounded-full overflow-hidden border-[2.5px] transition-all duration-200 ${
                            isActive
                                ? 'border-orange-400 shadow-[0_0_0_3px_rgba(249,115,22,0.12)]'
                                : 'border-slate-200 group-hover:border-slate-300'
                        }`}>
                            <img
                                src={imgSrc}
                                alt={category}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                        {/* Label */}
                        <span className={`text-[10px] font-semibold text-center leading-tight max-w-[64px] transition-colors ${
                            isActive ? 'text-orange-500' : 'text-slate-500 group-hover:text-slate-700'
                        }`}>
                            {category}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
