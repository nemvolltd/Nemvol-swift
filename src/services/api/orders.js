import { db } from './mockData';
import { delay, LATENCY } from './utils';

export const ordersApi = {
    getOrders: async () => {
        await delay(LATENCY);
        return [...db.orders];
    },

    placeOrder: async (orderData) => {
        await delay(LATENCY + 200);
        const newOrder = {
            id: `ORD-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: 'Processing',
            ...orderData
        };
        db.orders.unshift(newOrder);
        // Clear selected cart items on success
        db.cart = db.cart.filter(item => !item.selected);
        return newOrder;
    },

    updateOrderStatus: async (orderId, status) => {
        await delay(LATENCY);
        const index = db.orders.findIndex(o => o.id === orderId);
        if (index === -1) throw new Error('Order not found');
        db.orders[index] = {
            ...db.orders[index],
            status: status
        };
        return [...db.orders];
    }
};
