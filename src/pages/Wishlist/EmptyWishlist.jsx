import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function EmptyWishlist() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-pageSlideUp">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
                <Heart className="w-7 h-7 text-orange-400" strokeWidth={1.8} />
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">Your Wishlist is Empty</h2>
            <p className="text-xs text-slate-400 font-semibold mb-6 max-w-xs leading-relaxed uppercase tracking-wider">
                Save your favorite items here to easily find them later.
            </p>
            <Link
                to="/products"
                className="h-12 px-8 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_16px_rgba(249,115,22,0.2)] flex items-center justify-center hover:scale-105 active:scale-95 duration-200"
            >
                Explore Products
            </Link>
        </div>
    );
}
