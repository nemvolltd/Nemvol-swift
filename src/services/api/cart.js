import apiClient from './client';

export const cartApi = {
    getCart: async () => {
        const response = await apiClient.get('/cart');
        const data = response.data.data || response.data;
        return data.cart || data;
    },

    addToCart: async (product, size, quantity = 1) => {
        const response = await apiClient.post('/cart/items', { product, size, quantity });
        const data = response.data.data || response.data;
        return data.cart || data;
    },

    removeFromCart: async (productId, size) => {
        // Send fields either as query params or request payload depending on REST standards
        const response = await apiClient.delete('/cart/items', { data: { productId, size } });
        const data = response.data.data || response.data;
        return data.cart || data;
    },

    updateCartQuantity: async (productId, size, delta) => {
        const response = await apiClient.patch('/cart/items', { productId, size, delta });
        const data = response.data.data || response.data;
        return data.cart || data;
    },

    toggleCartItemSelection: async (productId, size) => {
        const response = await apiClient.patch('/cart/items/select', { productId, size });
        const data = response.data.data || response.data;
        return data.cart || data;
    },

    toggleSelectAll: async (selectAllVal) => {
        const response = await apiClient.patch('/cart/select-all', { selectAllVal });
        const data = response.data.data || response.data;
        return data.cart || data;
    },

    clearSelectedCartItems: async () => {
        const response = await apiClient.delete('/cart/selected');
        const data = response.data.data || response.data;
        return data.cart || data;
    }
};
