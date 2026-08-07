import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { useToggleWishlist, useIsWishlisted } from '../../hooks/useWishlist';

export default function ShopProductCard({ product }) {
    const { mutate: toggleWishlist } = useToggleWishlist();
    const wishlisted = useIsWishlisted(product.id);

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product.id);
    };

    // Calculate stable mock fields for rating and discount based on product.id
    const charSum = product.id ? product.id.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
    
    // Rating between 4.5 and 5.0
    const rating = ((charSum % 6) / 10 + 4.5).toFixed(1);
    
    // Sales count between 15 and 99
    const soldCount = (charSum % 85) + 15;
    
    // 60% chance of discount
    const hasDiscount = charSum % 10 < 6;
    const discountPercent = (charSum % 3) * 5 + 5; // 5%, 10%, 15%
    const originalPrice = product.price / (1 - discountPercent / 100);

    // Show "New!" badge for 40% of products
    const isNew = charSum % 10 < 4;

    return (
        <Link 
            to={`/product/${product.id}`} 
            className="flex flex-col group cursor-pointer bg-white rounded-2xl border border-slate-100/70 overflow-hidden hover:shadow-md transition-all duration-300 h-full"
        >
            {/* Image Container with gray bg */}
            <div className="relative aspect-square bg-slate-50 overflow-hidden flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Floating "New!" Badge */}
                {isNew && (
                    <span className="absolute top-3 left-3 bg-black text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                        New!
                    </span>
                )}

                {/* Wishlist Button floating at bottom right corner of image container */}
                <button
                    onClick={handleWishlistToggle}
                    className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-transform z-10 border-none cursor-pointer ${
                        wishlisted ? 'bg-white' : 'bg-white/90 backdrop-blur-sm'
                    }`}
                    aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart
                        className={`w-4 h-4 transition-colors ${
                            wishlisted ? 'fill-orange-500 text-orange-500' : 'text-slate-400 group-hover:text-slate-650'
                        }`}
                        strokeWidth={2}
                    />
                </button>
            </div>

            {/* Product Details Section */}
            <div className="p-3 flex flex-col justify-between flex-1">
                <div className="flex flex-col">
                    {/* Title */}
                    <h4 className="text-[12px] md:text-[13px] font-semibold text-slate-800 line-clamp-2 leading-snug mb-1.5 group-hover:text-orange-500 transition-colors">
                        {product.name}
                    </h4>

                    {/* Price */}
                    <div className="text-sm md:text-base font-extrabold text-slate-900 leading-none">
                        ${product.price.toFixed(2)}
                    </div>

                    {/* Discount & Original Price row */}
                    {hasDiscount && (
                        <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="bg-rose-50 text-rose-500 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                                {discountPercent}%
                            </span>
                            <span className="text-[11px] text-slate-400 line-through">
                                ${originalPrice.toFixed(2)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Rating & Sold count */}
                <div className="flex items-center gap-1 text-[10px] md:text-[11px] text-slate-400 font-bold mt-2.5 pt-2 border-t border-slate-50">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                    <span>{rating}</span>
                    <span className="text-slate-300">•</span>
                    <span>{soldCount} Sold</span>
                </div>
            </div>
        </Link>
    );
}
