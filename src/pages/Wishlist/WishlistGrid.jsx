import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useToggleWishlist } from '../../hooks/useWishlist';
import { useAddToCart } from '../../hooks/useCart';
import useStore from '../../store/useStore';

export default function WishlistGrid({ items }) {
    const { mutate: toggleWishlist } = useToggleWishlist();
    const { mutate: addToCart } = useAddToCart();
    const setIsCartOpen = useStore((s) => s.setIsCartOpen);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-pageSlideUp">
            {items.map((product) => (
                <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    className="flex flex-col group cursor-pointer h-full justify-between bg-white p-3 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300"
                >
                    <div className="flex flex-col">
                        {/* Image section with overlay controls */}
                        <div className="relative aspect-[3/3.2] rounded-xl overflow-hidden bg-slate-50 mb-3">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            
                            {/* Wishlist Heart Icon overlay (removes item) */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleWishlist(product.id);
                                }}
                                className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-transform z-10 border-none cursor-pointer"
                                aria-label="Remove from wishlist"
                            >
                                <Heart className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                            </button>
                        </div>
                        
                        {/* Name and Price */}
                        <div className="flex flex-col px-1">
                            <h3 className="text-[13px] font-bold text-slate-800 line-clamp-1 group-hover:text-orange-500 transition-colors mb-0.5">
                                {product.name}
                            </h3>
                            <p className="text-[13px] font-extrabold text-slate-900">${product.price.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Add to Cart CTA */}
                    <div className="px-1 mt-3.5">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart({ product, size: 'M', quantity: 1 });
                                setIsCartOpen(true);
                            }}
                            className="w-full h-10 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-[0_2px_8px_rgba(249,115,22,0.15)] hover:shadow-[0_4px_12px_rgba(249,115,22,0.25)] flex items-center justify-center gap-1.5 cursor-pointer border-none"
                        >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Buy Now</span>
                        </button>
                    </div>
                </Link>
            ))}
        </div>
    );
}
