import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';

export default function WishlistGrid({ items }) {
    const { toggleWishlist, addToCart, setIsCartOpen } = useEcommerce();

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((product) => (
                <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    className="flex flex-col group cursor-pointer h-full justify-between bg-white p-3 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all"
                >
                    <div className="flex flex-col">
                        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 mb-3">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Remove from Wishlist Button */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleWishlist(product.id);
                                }}
                                className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
                                aria-label="Remove from wishlist"
                            >
                                <Heart className="w-4 h-4 text-blue-600 fill-blue-600" />
                            </button>
                        </div>
                        
                        <div className="flex flex-col px-1">
                            <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors mb-1">
                                {product.name}
                            </h3>
                            <p className="text-sm font-bold text-slate-500">${product.price.toFixed(2)}</p>
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
            ))}
        </div>
    );
}
