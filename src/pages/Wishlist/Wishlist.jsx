import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useWishlist } from '../../hooks/useWishlist';
import WishlistGrid from './WishlistGrid';
import EmptyWishlist from './EmptyWishlist';

export default function Wishlist() {
    const { data: products = [] } = useProducts();
    const { data: wishlist = [] } = useWishlist();

    // Resolve wishlisted products
    const productsArray = Array.isArray(products) ? products : [];
    const wishlistArray = Array.isArray(wishlist) ? wishlist : [];
    const wishlistedProducts = productsArray.filter(product => wishlistArray.includes(product.id));

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
