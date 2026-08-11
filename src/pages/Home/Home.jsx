import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import HeroBanner from './HeroBanner';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';
import HomeTopBar from './HomeTopBar';

export default function Home() {
    const navigate = useNavigate();
    const { data: products = [] } = useProducts();
    const { data: realCategories = [] } = useCategories();
    const [activeCategory, setActiveCategory] = useState('All');

    const defaultCategories = ['All', 'Shoes', 'Beauty', "Women's Fashion", 'Jewelry', "Men's Fashion"];
    const categories = realCategories.length > 0
        ? ['All', ...realCategories.map(c => c.name)]
        : defaultCategories;

    const productsArray = Array.isArray(products) ? products : [];
    const filteredProducts = productsArray.filter(product => {
        if (activeCategory === 'All') return true;
        const productCategory = product.category?.toLowerCase() || '';
        const selectedCat = activeCategory.toLowerCase();
        if (productCategory === selectedCat) return true;
        if (productCategory.includes(selectedCat) || selectedCat.includes(productCategory)) return true;
        const name = product.name.toLowerCase();
        if (name.includes(selectedCat)) return true;
        return false;
    });

    const displayProducts = filteredProducts.slice(0, 8);

    return (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-10 py-4 md:py-8">
            {/* Top Bar */}
            <HomeTopBar onFilterClick={() => {}} />

            {/* Hero Banner */}
            <HeroBanner />

            {/* Category Circles */}
            <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            {/* Special For You */}
            <div className="mb-5 flex items-center justify-between">
                <h3 className="text-[16px] font-bold text-slate-900">Special For You</h3>
                <button onClick={() => navigate('/products')} className="text-xs text-slate-400 hover:text-orange-500 font-medium transition-colors">
                    See all
                </button>
            </div>

            {/* Product Grid */}
            {displayProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 pb-6">
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
