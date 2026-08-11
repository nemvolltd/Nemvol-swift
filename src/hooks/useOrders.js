import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useStore from '../store/useStore';

// ── Local storage helpers ────────────────────────────────────────────────────
const ORDERS_KEY = 'local-orders';

const getLocalOrders = () => {
    try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }
    catch { return []; }
};

const saveLocalOrders = (orders) => {
    try { localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); }
    catch { /* ignore */ }
};

// ── useOrders ────────────────────────────────────────────────────────────────
/**
 * Fetch all orders from localStorage (requires login).
 */
export function useOrders() {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    return useQuery({
        queryKey: ['orders'],
        queryFn:  () => getLocalOrders(),
        enabled:  isLoggedIn,
    });
}

// ── usePlaceOrder ─────────────────────────────────────────────────────────────
/**
 * Place a new order — saves it locally and clears the cart.
 */
export function usePlaceOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (orderPayload) => {
            const current = getLocalOrders();
            const newOrder = {
                ...orderPayload,
                id:        Date.now(),
                status:    'Processing',
                createdAt: new Date().toISOString(),
            };
            const updated = [newOrder, ...current];
            saveLocalOrders(updated);
            // Clear the cart on checkout
            try { localStorage.setItem('guest-cart', JSON.stringify([])); }
            catch { /* ignore */ }
            return newOrder;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.setQueryData(['cart'], []);
        },
    });
}

// ── useUpdateOrderStatus ──────────────────────────────────────────────────────
/**
 * Update the status of an existing order (admin only).
 */
export function useUpdateOrderStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ orderId, status }) => {
            const updated = getLocalOrders().map((o) =>
                o.id === orderId ? { ...o, status } : o
            );
            saveLocalOrders(updated);
            return updated;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}
