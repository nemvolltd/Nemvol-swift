import apiClient from './client';

export const ordersApi = {
    getOrders: async () => {
        const response = await apiClient.get('/orders');
        const data = response.data.data || response.data;
        return data.orders || data;
    },

    placeOrder: async (orderData) => {
        const response = await apiClient.post('/orders', orderData);
        const data = response.data.data || response.data;
        return data.order || data;
    },

    updateOrderStatus: async (orderId, status) => {
        const response = await apiClient.patch(`/admin/orders/${orderId}/status`, { status });
        const data = response.data.data || response.data;
        return data.orders || data;
    }
};
