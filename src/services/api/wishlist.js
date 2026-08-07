import apiClient from './client';

export const wishlistApi = {
    getWishlist: async () => {
        const response = await apiClient.get('/wishlist');
        const data = response.data.data || response.data;
        return data.wishlist || data;
    },

    toggleWishlist: async (productId) => {
        const response = await apiClient.post('/wishlist/toggle', { productId });
        const data = response.data.data || response.data;
        return data.wishlist || data;
    }
};
