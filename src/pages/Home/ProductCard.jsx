import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';

export default function ProductCard({ product }) {
    const { toggleWishlist, isProductWishlisted, addToCart, setIsCartOpen } = useEcommerce();
    const wishlisted = isProductWishlisted(product.id);

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product.id);
    };

    return (
        <Link to={`/product/${product.id}`} className="flex flex-col group cursor-pointer h-full justify-between bg-white p-3 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col">
                {/* Product Image Container */}
                <div className="relative aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden mb-3">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Wishlist Button */}
                    <button
                        onClick={handleWishlistToggle}
                        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
                        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        <Heart
                            className={`w-4 h-4 ${wishlisted ? 'fill-blue-600 text-blue-600' : 'text-slate-900'}`}
                            strokeWidth={2}
                        />
                    </button>
                </div>

                {/* Product Info */}
                <div className="flex flex-col px-1">
                    <span className="text-[10px] md:text-xs text-slate-500 font-medium mb-0.5">
                        {product.category}
                    </span>
                    <h4 className="text-sm md:text-base font-bold text-slate-900 mb-1 truncate">
                        {product.name}
                    </h4>
                    <span className="text-sm font-bold text-slate-500">
                        ${product.price.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Buy Now Button */}
            <div className="px-1 mt-3">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product, 'M', 1);
                        setIsCartOpen(true);
                    }}
                    className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1.5"
                >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Buy Now
                </button>
            </div>
        </Link>
    );
}
