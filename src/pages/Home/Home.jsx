import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import HeroBanner from './HeroBanner';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';

export default function Home() {
    const { data: products = [] } = useProducts();
    const { data: realCategories = [] } = useCategories();
    const [activeCategory, setActiveCategory] = useState('All');

    const defaultCategories = ['All', 'Dresses', 'Shirts', 'Jeans', 'Blazers', 'Children Wear'];
    const categories = realCategories.length > 0 
        ? ['All', ...realCategories.map(c => c.name)]
        : defaultCategories;

    // Dynamic filtering logic
    const productsArray = Array.isArray(products) ? products : [];
    const filteredProducts = productsArray.filter(product => {
        if (activeCategory === 'All') return true;
        
        const productCategory = product.category?.toLowerCase() || '';
        const selectedCat = activeCategory.toLowerCase();
        
        // Exact name or ID match
        if (productCategory === selectedCat) return true;
        
        // Substring matches
        if (productCategory.includes(selectedCat) || selectedCat.includes(productCategory)) return true;
        
        // Substring match on product title (fallback)
        const name = product.name.toLowerCase();
        if (name.includes(selectedCat)) return true;
        
        return false;
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
