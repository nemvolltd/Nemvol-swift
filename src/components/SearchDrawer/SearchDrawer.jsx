import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, X, ChevronRight, TrendingUp } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { useModalState } from '../../hooks/useModalState';

export default function SearchDrawer({ isOpen, onClose }) {
    useModalState(isOpen);
    const navigate = useNavigate();
    const { data: products = [] } = useProducts();
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    const popularTags = ['Trouser', 'Shirt', 'Dress', 'Blazer', 'Skirt', 'Pleats'];

    // Auto-focus input when drawer opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 150);
        } else {
            setQuery('');
        }
    }, [isOpen]);

    // Filtering logic
    const productsArray = Array.isArray(products) ? products : [];
    const matchingProducts = query.trim() === ''
        ? []
        : productsArray.filter(product => {
            const term = query.toLowerCase();
            return (
                product.name.toLowerCase().includes(term) ||
                (product.category || '').toLowerCase().includes(term) ||
                (product.description || '').toLowerCase().includes(term)
            );
        });

    const handleTagClick = (tag) => {
        setQuery(tag);
        inputRef.current?.focus();
    };

    const handleItemClick = (productId) => {
        onClose();
        navigate(`/product/${productId}`);
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header with Search Bar */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors shrink-0"
                        aria-label="Close search"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-900" />
                    </button>

                    <div className="flex-1 flex items-center h-11 px-3.5 bg-slate-50 border border-slate-200/80 rounded-xl focus-within:border-orange-500 focus-within:bg-white transition-all group">
                        <Search className="w-4 h-4 text-slate-400 mr-2.5 group-focus-within:text-orange-500 transition-colors" />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search products..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 bg-transparent text-sm text-slate-900 focus:outline-none placeholder:text-slate-400"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-600"
                                aria-label="Clear query"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Drawer Body */}
                <div className="flex-1 overflow-y-auto px-6 py-6 hide-scrollbar">
                    {query.trim() === '' ? (
                        /* Default screen: Trending tags & Recommended items */
                        <div className="flex flex-col gap-8">
                            {/* Popular tags */}
                            <div className="flex flex-col gap-3">
                                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
                                    Popular Searches
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {popularTags.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => handleTagClick(tag)}
                                            className="px-3 py-1.5 bg-slate-50 border border-slate-100 hover:bg-orange-50 hover:border-orange-100 hover:text-orange-500 rounded-xl text-xs font-bold text-slate-600 transition-all"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Recommendations */}
                            <div className="flex flex-col gap-4">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    Trending Products
                                </span>
                                <div className="flex flex-col gap-4">
                                    {products.slice(0, 3).map(product => (
                                        <button
                                            key={product.id}
                                            onClick={() => handleItemClick(product.id)}
                                            className="flex items-center text-left gap-3.5 p-2 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300 group"
                                        >
                                            <div className="w-14 h-14 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100/50">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-orange-500 transition-colors">
                                                    {product.name}
                                                </h4>
                                                <span className="text-xs text-slate-400 font-medium">{product.category}</span>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <span className="text-sm font-black text-slate-900">${product.price.toFixed(2)}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Results screen */
                        <div className="flex flex-col gap-4">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Search Results ({matchingProducts.length})
                            </span>

                            {matchingProducts.length > 0 ? (
                                <div className="flex flex-col gap-3.5">
                                    {matchingProducts.map(product => (
                                        <button
                                            key={product.id}
                                            onClick={() => handleItemClick(product.id)}
                                            className="flex items-center text-left gap-3.5 p-2 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300 group"
                                        >
                                            <div className="w-14 h-14 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100/50">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-orange-500 transition-colors">
                                                    {product.name}
                                                </h4>
                                                <span className="text-xs text-slate-400 font-semibold">{product.category}</span>
                                            </div>
                                            <div className="flex items-center gap-1 shrink-0">
                                                <span className="text-sm font-black text-slate-950">${product.price.toFixed(2)}</span>
                                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 transition-colors" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <span className="text-2xl mb-2">🔍</span>
                                    <p className="text-sm text-slate-500 font-bold">No products found</p>
                                    <p className="text-xs text-slate-400">Try a different search term or tags</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
