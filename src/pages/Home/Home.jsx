import React, { useState } from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import HeroBanner from './HeroBanner';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';

export default function Home() {
    const { products } = useEcommerce();
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Dresses', 'Shirts', 'Jeans', 'Blazers', 'Children Wear'];

    // Dynamic filtering logic
    const filteredProducts = products.filter(product => {
        if (activeCategory === 'All') return true;
        const name = product.name.toLowerCase();
        if (activeCategory === 'Dresses') return name.includes('dress');
        if (activeCategory === 'Shirts') return name.includes('shirt') || name.includes('blouse') || name.includes('tee');
        if (activeCategory === 'Jeans') return name.includes('trouser') || name.includes('pants') || name.includes('jeans');
        if (activeCategory === 'Blazers') return name.includes('blazer') || name.includes('jacket');
        if (activeCategory === 'Children Wear') return product.category.toLowerCase() === 'children';
        return true;
    });

    // We can show the first 4 for home page "Bestsellers"
    const displayProducts = filteredProducts.slice(0, 4);

    return (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-10 py-6">
            <HeroBanner />
            
            <CategoryFilter 
                categories={categories} 
                activeCategory={activeCategory} 
                onCategoryChange={setActiveCategory} 
            />

            {/* Bestsellers Section */}
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-bold text-slate-900">Bestsellers</h3>
                <button className="text-xs md:text-sm text-slate-500 hover:text-slate-900 font-medium">
                    See All
                </button>
            </div>

            {/* Product Grid */}
            {displayProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {displayProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-slate-400 text-sm">
                    No products found in this category.
                </div>
            )}
        </div>
    );
}
