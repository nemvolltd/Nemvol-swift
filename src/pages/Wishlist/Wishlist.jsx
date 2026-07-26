import React from 'react';
import { useEcommerce } from '../../context/EcommerceContext';
import WishlistGrid from './WishlistGrid';
import EmptyWishlist from './EmptyWishlist';

export default function Wishlist() {
    const { products, wishlist } = useEcommerce();

    // Resolve wishlisted products
    const wishlistedProducts = products.filter(product => wishlist.includes(product.id));

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">My Wishlist</h1>
                <span className="text-sm font-medium text-slate-500">{wishlistedProducts.length} items</span>
            </div>

            {wishlistedProducts.length > 0 ? (
                <WishlistGrid items={wishlistedProducts} />
            ) : (
                <EmptyWishlist />
            )}
        </div>
    );
}
