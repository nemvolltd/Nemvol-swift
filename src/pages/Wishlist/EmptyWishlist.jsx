import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function EmptyWishlist() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-slate-300" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
            <p className="text-sm text-slate-500 mb-6 max-w-xs">
                Save your favorite items here to easily find them later.
            </p>
            <Link
                to="/products"
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-600/10 flex items-center justify-center"
            >
                Explore Products
            </Link>
        </div>
    );
}
