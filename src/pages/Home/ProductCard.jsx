import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useToggleWishlist, useIsWishlisted } from '../../hooks/useWishlist';
import { useAddToCart } from '../../hooks/useCart';
import useStore from '../../store/useStore';

// Mock color swatches per product — cycle through a set if product has none
const SWATCH_SETS = [
    ['#1C1C1C', '#E5E7EB', '#2563EB', '#EF4444', '#FCD34D'],
    ['#6366F1', '#F97316', '#10B981'],
    ['#0F172A', '#F8FAFC', '#D97706'],
];

function getSwatches(productId) {
    const idx = (productId?.toString().charCodeAt(0) || 0) % SWATCH_SETS.length;
    return SWATCH_SETS[idx];
}

export default function ProductCard({ product }) {
    const { mutate: toggleWishlist } = useToggleWishlist();
    const wishlisted = useIsWishlisted(product.id);
    const { mutate: addToCart } = useAddToCart();
    const setIsCartOpen = useStore((s) => s.setIsCartOpen);

    const swatches = getSwatches(product.id);

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product.id);
    };

    return (
        <Link
            to={`/product/${product.id}`}
            className="flex flex-col group cursor-pointer bg-white rounded-2xl border border-slate-100 hover:border-slate-200 transition-all overflow-hidden"
        >
            {/* Product image area */}
            <div className="relative aspect-[3/3.2] bg-slate-50 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Orange wishlist heart — top right */}
                <button
                    onClick={handleWishlistToggle}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 border-none cursor-pointer ${
                        wishlisted
                            ? 'bg-orange-500 shadow-[0_2px_8px_rgba(249,115,22,0.35)]'
                            : 'bg-white shadow-sm hover:bg-orange-50'
                    }`}
                    aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <Heart
                        className={`w-3.5 h-3.5 ${wishlisted ? 'fill-white text-white' : 'text-orange-400'}`}
                        strokeWidth={2.2}
                    />
                </button>
            </div>

            {/* Product info */}
            <div className="p-3 flex flex-col gap-1.5">
                {/* Name */}
                <h4 className="text-[13px] font-semibold text-slate-800 truncate leading-tight">
                    {product.name}
                </h4>

                {/* Price */}
                <span className="text-[13px] font-bold text-slate-900">
                    ${product.price.toFixed(2)}
                </span>

                {/* Color swatches + Add to cart */}
                <div className="flex items-center justify-between mt-0.5">
                    {/* Color dot swatches */}
                    <div className="flex items-center gap-1">
                        {swatches.map((color, i) => (
                            <span
                                key={i}
                                className="w-3.5 h-3.5 rounded-full border border-white shadow-sm shrink-0"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>

                    {/* Add to cart circle button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart({ product, size: 'M', quantity: 1 });
                            setIsCartOpen(true);
                        }}
                        className="w-7 h-7 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-all border-none cursor-pointer shadow-[0_2px_6px_rgba(249,115,22,0.35)]"
                        aria-label="Add to cart"
                    >
                        <span className="text-base leading-none font-light mb-0.5">+</span>
                    </button>
                </div>
            </div>
        </Link>
    );
}
