import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useStore from '../store/useStore';

// ── Local storage helpers ────────────────────────────────────────────────────
const CART_KEY = 'guest-cart';

const getLocalCart = () => {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
};

const saveLocalCart = (cart) => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
    catch { /* ignore */ }
};

// ── useCart ──────────────────────────────────────────────────────────────────
/**
 * Fetch the current cart from localStorage (works for both guests and logged-in users).
 */
export function useCart() {
    return useQuery({
        queryKey: ['cart'],
        queryFn:  () => getLocalCart(),
        enabled:  true,
    });
}

// ── useAddToCart ─────────────────────────────────────────────────────────────
/**
 * Add a product (with size + quantity) to the cart.
 */
export function useAddToCart() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ product, size, quantity }) => {
            const local = getLocalCart();
            const existingIndex = local.findIndex(
                (item) => item.product.id === product.id && item.size === size
            );
            if (existingIndex > -1) {
                local[existingIndex].quantity += quantity;
            } else {
                local.push({ product, size, quantity, selected: true });
            }
            saveLocalCart(local);
            return local;
        },
        onSuccess: (updatedCart) => {
            queryClient.setQueryData(['cart'], updatedCart);
        },
    });
}

// ── useRemoveFromCart ────────────────────────────────────────────────────────
/**
 * Remove a specific product+size combination from the cart.
 */
export function useRemoveFromCart() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ productId, size }) => {
            const local = getLocalCart().filter(
                (item) => !(item.product.id === productId && item.size === size)
            );
            saveLocalCart(local);
            return local;
        },
        onSuccess: (updatedCart) => {
            queryClient.setQueryData(['cart'], updatedCart);
        },
    });
}

// ── useUpdateCartQty ─────────────────────────────────────────────────────────
/**
 * Increment or decrement a cart item's quantity (optimistic update).
 */
export function useUpdateCartQty() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ productId, size, delta }) => {
            const local = getLocalCart().map((item) => {
                if (item.product.id === productId && item.size === size) {
                    return { ...item, quantity: Math.max(1, item.quantity + delta) };
                }
                return item;
            });
            saveLocalCart(local);
            return local;
        },
        onMutate: async ({ productId, size, delta }) => {
            await queryClient.cancelQueries({ queryKey: ['cart'] });
            const previous = queryClient.getQueryData(['cart']);
            queryClient.setQueryData(['cart'], (old) =>
                old?.map((item) => {
                    if (item.product.id === productId && item.size === size) {
                        return { ...item, quantity: Math.max(1, item.quantity + delta) };
                    }
                    return item;
                })
            );
            return { previous };
        },
        onError: (_err, _vars, context) => {
            queryClient.setQueryData(['cart'], context?.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });
}

// ── useToggleCartSelect ───────────────────────────────────────────────────────
/**
 * Toggle the "selected" state of a single cart item (optimistic).
 */
export function useToggleCartSelect() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ productId, size }) => {
            const local = getLocalCart().map((item) => {
                if (item.product.id === productId && item.size === size) {
                    return { ...item, selected: !item.selected };
                }
                return item;
            });
            saveLocalCart(local);
            return local;
        },
        onMutate: async ({ productId, size }) => {
            await queryClient.cancelQueries({ queryKey: ['cart'] });
            const previous = queryClient.getQueryData(['cart']);
            queryClient.setQueryData(['cart'], (old) =>
                old?.map((item) => {
                    if (item.product.id === productId && item.size === size) {
                        return { ...item, selected: !item.selected };
                    }
                    return item;
                })
            );
            return { previous };
        },
        onError: (_err, _vars, context) => {
            queryClient.setQueryData(['cart'], context?.previous);
        },
    });
}

// ── useToggleSelectAll ────────────────────────────────────────────────────────
/**
 * Select or deselect all cart items at once (optimistic).
 */
export function useToggleSelectAll() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (selectAll) => {
            const local = getLocalCart().map((item) => ({ ...item, selected: selectAll }));
            saveLocalCart(local);
            return local;
        },
        onMutate: async (selectAll) => {
            await queryClient.cancelQueries({ queryKey: ['cart'] });
            const previous = queryClient.getQueryData(['cart']);
            queryClient.setQueryData(['cart'], (old) =>
                old?.map((item) => ({ ...item, selected: selectAll }))
            );
            return { previous };
        },
        onError: (_err, _vars, context) => {
            queryClient.setQueryData(['cart'], context?.previous);
        },
    });
}

// ── useClearSelectedItems ─────────────────────────────────────────────────────
/**
 * Remove all currently selected items from the cart.
 */
export function useClearSelectedItems() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const local = getLocalCart().filter((item) => !item.selected);
            saveLocalCart(local);
            return local;
        },
        onSuccess: (remainingCart) => {
            queryClient.setQueryData(['cart'], remainingCart);
        },
    });
}
