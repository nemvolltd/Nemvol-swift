import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import CategoryFilterTabs from './CategoryFilterTabs';
import ProductGrid from './ProductGrid';

const SkeletonGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[...Array(8)].map((_, index) => (
            <div key={index} className="flex flex-col gap-3 animate-pulse">
                <div className="aspect-[4/5] w-full bg-slate-100 rounded-2xl"></div>
                <div className="h-4 bg-slate-100 rounded-md w-2/3"></div>
                <div className="h-3.5 bg-slate-100 rounded-md w-1/3"></div>
            </div>
        ))}
    </div>
);

export default function Products() {
    const { data: products = [], isLoading: isLoadingProducts, error } = useProducts();
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
        
        // Substring matches (e.g. Dresses vs Dress)
        if (productCategory.includes(selectedCat) || selectedCat.includes(productCategory)) return true;
        
        // Substring match on product title (fallback for mock data)
        const name = product.name.toLowerCase();
        if (name.includes(selectedCat)) return true;
        
        return false;
    });

    return (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-10 py-6 md:py-10">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Shop Collection</h1>
                    <p className="text-slate-500 text-sm md:text-base">Discover our latest arrivals and premium essentials.</p>
                </div>

                <button className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider hover:opacity-70 transition-opacity">
                    <SlidersHorizontal className="w-4 h-4" strokeWidth={2} />
                    Filter
                </button>
            </div>

            {/* Category Filter */}
            <CategoryFilterTabs 
                categories={categories} 
                activeCategory={activeCategory} 
                onCategoryChange={setActiveCategory} 
            />

            {/* Product Grid or Skeleton or Error */}
            {isLoadingProducts ? (
                <SkeletonGrid />
            ) : error ? (
                <div className="text-center py-20 bg-red-50/50 rounded-2xl border border-red-100/50 max-w-md mx-auto">
                    <p className="text-red-600 text-sm font-bold uppercase tracking-wider">{error.message}</p>
                </div>
            ) : filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
            ) : (
                <div className="text-center py-20 text-slate-400 text-sm font-semibold uppercase tracking-wider">
                    No products found in this category.
                </div>
            )}
        </div>
    );
}
