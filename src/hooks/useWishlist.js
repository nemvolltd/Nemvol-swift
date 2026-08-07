import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api/index';
import useStore from '../store/useStore';

const getLocalWishlist = () => {
    try {
        const wishlistData = localStorage.getItem('guest-wishlist');
        return wishlistData ? JSON.parse(wishlistData) : [];
    } catch (e) {
        return [];
    }
};

const saveLocalWishlist = (wishlist) => {
    try {
        localStorage.setItem('guest-wishlist', JSON.stringify(wishlist));
    } catch (e) {
        // ignore
    }
};

/**
 * Fetch wishlist (array of product IDs)
 */
export function useWishlist() {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    return useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {
            if (isLoggedIn) {
                return api.getWishlist();
            } else {
                return getLocalWishlist();
            }
        },
        enabled: true,
    });
}

/**
 * Toggle a product in the wishlist (optimistic)
 */
export function useToggleWishlist() {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (productId) => {
            if (isLoggedIn) {
                return api.toggleWishlist(productId);
            } else {
                const local = getLocalWishlist();
                let updated;
                if (local.includes(productId)) {
                    updated = local.filter((id) => id !== productId);
                } else {
                    updated = [...local, productId];
                }
                saveLocalWishlist(updated);
                return updated;
            }
        },
        onMutate: async (productId) => {
            await queryClient.cancelQueries({ queryKey: ['wishlist'] });
            const previous = queryClient.getQueryData(['wishlist']);
            queryClient.setQueryData(['wishlist'], (old) => {
                if (!old) return [productId];
                if (old.includes(productId)) {
                    return old.filter((id) => id !== productId);
                }
                return [...old, productId];
            });
            return { previous };
        },
        onError: (_err, _vars, context) => {
            queryClient.setQueryData(['wishlist'], context?.previous);
        },
        onSuccess: (updatedWishlist) => {
            queryClient.setQueryData(['wishlist'], updatedWishlist);
        }
    });
}

/**
 * Helper: check if a product is wishlisted
 */
export function useIsWishlisted(productId) {
    const { data: wishlist } = useWishlist();
    return wishlist?.includes(productId) ?? false;
}
