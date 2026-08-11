import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ── Local storage helpers ────────────────────────────────────────────────────
const WISHLIST_KEY = 'guest-wishlist';

const getLocalWishlist = () => {
    try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
    catch { return []; }
};

const saveLocalWishlist = (wishlist) => {
    try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)); }
    catch { /* ignore */ }
};

// ── useWishlist ──────────────────────────────────────────────────────────────
/**
 * Fetch the wishlist (array of product IDs) from localStorage.
 */
export function useWishlist() {
    return useQuery({
        queryKey: ['wishlist'],
        queryFn:  () => getLocalWishlist(),
        enabled:  true,
    });
}

// ── useToggleWishlist ────────────────────────────────────────────────────────
/**
 * Toggle a product in/out of the wishlist (optimistic update).
 */
export function useToggleWishlist() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (productId) => {
            const local = getLocalWishlist();
            const updated = local.includes(productId)
                ? local.filter((id) => id !== productId)
                : [...local, productId];
            saveLocalWishlist(updated);
            return updated;
        },
        onMutate: async (productId) => {
            await queryClient.cancelQueries({ queryKey: ['wishlist'] });
            const previous = queryClient.getQueryData(['wishlist']);
            queryClient.setQueryData(['wishlist'], (old) => {
                if (!old) return [productId];
                return old.includes(productId)
                    ? old.filter((id) => id !== productId)
                    : [...old, productId];
            });
            return { previous };
        },
        onError: (_err, _vars, context) => {
            queryClient.setQueryData(['wishlist'], context?.previous);
        },
        onSuccess: (updatedWishlist) => {
            queryClient.setQueryData(['wishlist'], updatedWishlist);
        },
    });
}

// ── useIsWishlisted ──────────────────────────────────────────────────────────
/**
 * Helper: returns true if the given productId is in the local wishlist.
 */
export function useIsWishlisted(productId) {
    const { data: wishlist } = useWishlist();
    return wishlist?.includes(productId) ?? false;
}
