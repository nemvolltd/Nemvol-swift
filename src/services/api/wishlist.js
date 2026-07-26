import { db } from './mockData';
import { delay, LATENCY } from './utils';

export const wishlistApi = {
    getWishlist: async () => {
        await delay(LATENCY - 200);
        return [...db.wishlist];
    },

    toggleWishlist: async (productId) => {
        await delay(LATENCY - 200);
        if (db.wishlist.includes(productId)) {
            db.wishlist = db.wishlist.filter(id => id !== productId);
        } else {
            db.wishlist.push(productId);
        }
        return [...db.wishlist];
    }
};
