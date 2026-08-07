import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api/index';
import useStore from '../store/useStore';

/**
 * Fetch all orders for the current user
 */
export function useOrders() {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    return useQuery({
        queryKey: ['orders'],
        queryFn: api.getOrders,
        enabled: isLoggedIn,
    });
}

/**
 * Place a new order
 */
export function usePlaceOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderPayload) => api.placeOrder(orderPayload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
}

/**
 * Update order status (admin)
 */
export function useUpdateOrderStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ orderId, status }) => api.updateOrderStatus(orderId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}
