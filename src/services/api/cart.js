import { db } from './mockData';
import { delay, LATENCY } from './utils';

export const cartApi = {
    getCart: async () => {
        await delay(LATENCY);
        return [...db.cart];
    },

    addToCart: async (product, size, quantity = 1) => {
        await delay(LATENCY - 100);
        const existingIndex = db.cart.findIndex(
            item => item.product.id === product.id && item.size === size
        );
        if (existingIndex > -1) {
            db.cart[existingIndex].quantity += quantity;
        } else {
            db.cart.push({ product, size, quantity, selected: true });
        }
        return [...db.cart];
    },

    removeFromCart: async (productId, size) => {
        await delay(LATENCY - 200);
        db.cart = db.cart.filter(item => !(item.product.id === productId && item.size === size));
        return [...db.cart];
    },

    updateCartQuantity: async (productId, size, delta) => {
        await delay(LATENCY - 300);
        db.cart = db.cart.map(item => {
            if (item.product.id === productId && item.size === size) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        return [...db.cart];
    },

    toggleCartItemSelection: async (productId, size) => {
        await delay(LATENCY - 400);
        db.cart = db.cart.map(item => {
            if (item.product.id === productId && item.size === size) {
                return { ...item, selected: !item.selected };
            }
            return item;
        });
        return [...db.cart];
    },

    toggleSelectAll: async (selectAllVal) => {
        await delay(LATENCY - 400);
        db.cart = db.cart.map(item => ({ ...item, selected: selectAllVal }));
        return [...db.cart];
    },

    clearSelectedCartItems: async () => {
        await delay(LATENCY - 200);
        db.cart = db.cart.filter(item => !item.selected);
        return [...db.cart];
    }
};
