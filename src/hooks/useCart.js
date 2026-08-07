import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api/index';
import useStore from '../store/useStore';

const getLocalCart = () => {
    try {
        const cartData = localStorage.getItem('guest-cart');
        return cartData ? JSON.parse(cartData) : [];
    } catch (e) {
        return [];
    }
};

const saveLocalCart = (cart) => {
    try {
        localStorage.setItem('guest-cart', JSON.stringify(cart));
    } catch (e) {
        // ignore
    }
};

/**
 * Fetch the user's cart
 */
export function useCart() {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    return useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            if (isLoggedIn) {
                return api.getCart();
            } else {
                return getLocalCart();
            }
        },
        enabled: true,
    });
}

/**
 * Add item to cart
 */
export function useAddToCart() {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ product, size, quantity }) => {
            if (isLoggedIn) {
                return api.addToCart(product, size, quantity);
            } else {
                const local = getLocalCart();
                const existingIndex = local.findIndex(
                    item => item.product.id === product.id && item.size === size
                );
                if (existingIndex > -1) {
                    local[existingIndex].quantity += quantity;
                } else {
                    local.push({ product, size, quantity, selected: true });
                }
                saveLocalCart(local);
                return local;
            }
        },
        onSuccess: (updatedCart) => {
            queryClient.setQueryData(['cart'], updatedCart);
        },
    });
}

/**
 * Remove item from cart
 */
export function useRemoveFromCart() {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ productId, size }) => {
            if (isLoggedIn) {
                return api.removeFromCart(productId, size);
            } else {
                const local = getLocalCart().filter(item => !(item.product.id === productId && item.size === size));
                saveLocalCart(local);
                return local;
            }
        },
        onSuccess: (updatedCart) => {
            queryClient.setQueryData(['cart'], updatedCart);
        },
    });
}

/**
 * Update cart item quantity (optimistic)
 */
export function useUpdateCartQty() {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ productId, size, delta }) => {
            if (isLoggedIn) {
                return api.updateCartQuantity(productId, size, delta);
            } else {
                const local = getLocalCart().map(item => {
                    if (item.product.id === productId && item.size === size) {
                        const newQuantity = Math.max(1, item.quantity + delta);
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                });
                saveLocalCart(local);
                return local;
            }
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

/**
 * Toggle cart item selection (optimistic)
 */
export function useToggleCartSelect() {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ productId, size }) => {
            if (isLoggedIn) {
                return api.toggleCartItemSelection(productId, size);
            } else {
                const local = getLocalCart().map(item => {
                    if (item.product.id === productId && item.size === size) {
                        return { ...item, selected: !item.selected };
                    }
                    return item;
                });
                saveLocalCart(local);
                return local;
            }
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

/**
 * Toggle select all cart items (optimistic)
 */
export function useToggleSelectAll() {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (selectAll) => {
            if (isLoggedIn) {
                return api.toggleSelectAll(selectAll);
            } else {
                const local = getLocalCart().map(item => ({ ...item, selected: selectAll }));
                saveLocalCart(local);
                return local;
            }
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

/**
 * Clear selected cart items
 */
export function useClearSelectedItems() {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            if (isLoggedIn) {
                return api.clearSelectedCartItems();
            } else {
                const local = getLocalCart().filter(item => !item.selected);
                saveLocalCart(local);
                return local;
            }
        },
        onSuccess: (remainingCart) => {
            queryClient.setQueryData(['cart'], remainingCart);
        },
    });
}
