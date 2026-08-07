import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    SlidersHorizontal, 
    ArrowLeft, 
    Search, 
    ChevronDown, 
    ArrowUpDown 
} from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import CategoryFilterTabs from './CategoryFilterTabs';
import ProductGrid from './ProductGrid';

const SkeletonGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-pulse">
        {[...Array(8)].map((_, index) => (
            <div key={index} className="flex flex-col gap-3">
                <div className="aspect-square w-full bg-slate-100 rounded-2xl"></div>
                <div className="h-4 bg-slate-100 rounded-md w-2/3"></div>
                <div className="h-3.5 bg-slate-100 rounded-md w-1/3"></div>
            </div>
        ))}
    </div>
);

export default function Products() {
    const navigate = useNavigate();
    const { data: products = [], isLoading: isLoadingProducts, error } = useProducts();
    const { data: realCategories = [] } = useCategories();

    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Popular'); // Popular, Latest, Best Sellers, Price
    const [priceSortDirection, setPriceSortDirection] = useState('asc'); // asc or desc

    const defaultCategories = ['All', 'Shoes', 'Beauty', "Women's Fashion", 'Jewelry', "Men's Fashion"];
    const categories = useMemo(() => {
        return realCategories.length > 0 
            ? ['All', ...realCategories.map(c => c.name)]
            : defaultCategories;
    }, [realCategories]);

    // Handle Tab Click
    const handleTabClick = (tab) => {
        if (tab === 'Price') {
            if (activeTab === 'Price') {
                // Toggle direction
                setPriceSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
            } else {
                setActiveTab('Price');
                setPriceSortDirection('asc');
            }
        } else {
            setActiveTab(tab);
        }
    };

    // Stable seed value from product id string
    const getStableSeed = (id) => {
        return id ? id.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
    };

    // Dynamic filtering and sorting logic
    const processedProducts = useMemo(() => {
        const productsArray = Array.isArray(products) ? products : [];
        
        // 1. Apply active category filter
        let result = productsArray.filter(product => {
            if (activeCategory === 'All') return true;
            
            const productCategory = product.category?.toLowerCase() || '';
            const selectedCat = activeCategory.toLowerCase();
            
            if (productCategory === selectedCat) return true;
            if (productCategory.includes(selectedCat) || selectedCat.includes(productCategory)) return true;
            
            const name = product.name.toLowerCase();
            if (name.includes(selectedCat)) return true;
            
            return false;
        });

        // 2. Apply search query filter
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(product => 
                product.name.toLowerCase().includes(query) ||
                (product.category || '').toLowerCase().includes(query)
            );
        }

        // 3. Apply tab sort logic
        return [...result].sort((a, b) => {
            const seedA = getStableSeed(a.id);
            const seedB = getStableSeed(b.id);

            switch (activeTab) {
                case 'Latest':
                    // Sort by id / seed descending
                    return seedB - seedA;
                case 'Best Sellers':
                    // Sort by sold count (seed % 85 + 15) descending
                    const soldA = (seedA % 85) + 15;
                    const soldB = (seedB % 85) + 15;
                    return soldB - soldA;
                case 'Price':
                    return priceSortDirection === 'asc' 
                        ? a.price - b.price 
                        : b.price - a.price;
                case 'Popular':
                default:
                    // Sort by rating (seed % 6 / 10 + 4.5) descending
                    const ratingA = (seedA % 6) / 10 + 4.5;
                    const ratingB = (seedB % 6) / 10 + 4.5;
                    return ratingB - ratingA;
            }
        });
    }, [products, activeCategory, searchQuery, activeTab, priceSortDirection]);

    return (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-10 py-6 md:py-10 animate-pageSlideUp">
            
            {/* Top Search & Filter row matching mockup */}
            <div className="flex items-center gap-3 mb-6">
                {/* Back button */}
                <button 
                    onClick={() => navigate('/')}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors shrink-0 border-none bg-transparent cursor-pointer"
                    aria-label="Back"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-800" strokeWidth={2.2} />
                </button>

                {/* Search Input */}
                <div className="flex-1 flex items-center h-11 px-4 bg-slate-50 border border-slate-200/50 rounded-xl focus-within:border-orange-500/50 focus-within:bg-white transition-all group">
                    <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" strokeWidth={2} />
                    <input 
                        type="text"
                        placeholder="What are you looking for?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent text-sm text-slate-900 focus:outline-none placeholder:text-slate-400 font-medium"
                    />
                </div>

                {/* Filter button with orange outline */}
                <button className="h-11 w-11 sm:w-auto sm:px-4 flex items-center justify-center gap-2 border border-orange-500/30 hover:border-orange-500 rounded-xl text-orange-500 text-xs font-bold uppercase tracking-wider transition-all bg-orange-50/20 cursor-pointer shrink-0">
                    <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={2.2} />
                    <span className="hidden sm:inline">Filter</span>
                </button>
            </div>

            {/* Top Tabs Row matching mockup */}
            <div className="flex items-center gap-6 border-b border-slate-100 mb-6 overflow-x-auto hide-scrollbar">
                {['Popular', 'Latest', 'Best Sellers', 'Price'].map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                        <button
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={`pb-3 text-xs md:text-sm font-bold tracking-wide uppercase transition-all relative border-none bg-transparent cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                                isActive ? 'text-orange-500' : 'text-slate-400 hover:text-slate-650'
                            }`}
                        >
                            <span>{tab}</span>
                            {tab === 'Price' && (
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                    isActive && priceSortDirection === 'desc' ? 'rotate-180 text-orange-500' : 'text-slate-400'
                                }`} />
                            )}
                            {isActive && (
                                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-orange-500 rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Dynamic Category badge row */}
            <CategoryFilterTabs 
                categories={categories} 
                activeCategory={activeCategory} 
                onCategoryChange={setActiveCategory} 
            />

            {/* Products Count Info */}
            <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                    Showing {processedProducts.length} Items
                </span>
            </div>

            {/* Product Grid or Skeleton or Error */}
            {isLoadingProducts ? (
                <SkeletonGrid />
            ) : error ? (
                <div className="text-center py-20 bg-red-50/50 rounded-2xl border border-red-100/50 max-w-md mx-auto">
                    <p className="text-red-600 text-sm font-bold uppercase tracking-wider">{error.message}</p>
                </div>
            ) : processedProducts.length > 0 ? (
                <ProductGrid products={processedProducts} />
            ) : (
                <div className="text-center py-20 text-slate-450 text-xs font-bold uppercase tracking-wider">
                    No products match your criteria.
                </div>
            )}
        </div>
    );
}
