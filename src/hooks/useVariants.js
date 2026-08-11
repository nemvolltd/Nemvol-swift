import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ── Local storage helpers ────────────────────────────────────────────────────
const VARIANTS_KEY = 'local-variants';

const getLocalVariants = () => {
    try { return JSON.parse(localStorage.getItem(VARIANTS_KEY)) || {}; }
    catch { return {}; }
};

const saveLocalVariants = (variantsMap) => {
    try { localStorage.setItem(VARIANTS_KEY, JSON.stringify(variantsMap)); }
    catch { /* ignore */ }
};

// ── useVariants ───────────────────────────────────────────────────────────────
/**
 * Fetch all variants of a given product from local storage.
 */
export function useVariants(productId) {
    return useQuery({
        queryKey: ['variants', productId],
        queryFn:  () => {
            const map = getLocalVariants();
            return map[productId] || [];
        },
        enabled: !!productId,
    });
}

// ── useVariant ─────────────────────────────────────────────────────────────────
/**
 * Fetch a single variant by product ID and variant ID.
 */
export function useVariant(productId, variantId) {
    return useQuery({
        queryKey: ['variant', productId, variantId],
        queryFn:  () => {
            const map      = getLocalVariants();
            const variants = map[productId] || [];
            return variants.find((v) => String(v.id) === String(variantId)) || null;
        },
        enabled: !!productId && !!variantId,
    });
}

// ── useCreateVariant ──────────────────────────────────────────────────────────
/**
 * Add a new variant for a product (admin).
 */
export function useCreateVariant() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ productId, variantData }) => {
            const map      = getLocalVariants();
            const current  = map[productId] || [];
            const maxId    = current.reduce((m, v) => Math.max(m, v.id), 0);
            const newVar   = { ...variantData, id: maxId + 1, productId };
            map[productId] = [...current, newVar];
            saveLocalVariants(map);
            return newVar;
        },
        onSuccess: (data, { productId }) => {
            queryClient.invalidateQueries({ queryKey: ['variants', productId] });
        },
    });
}

// ── useUpdateVariant ──────────────────────────────────────────────────────────
/**
 * Update an existing variant (admin).
 */
export function useUpdateVariant() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ productId, variantId, variantData }) => {
            const map      = getLocalVariants();
            const current  = map[productId] || [];
            map[productId] = current.map((v) =>
                String(v.id) === String(variantId) ? { ...v, ...variantData } : v
            );
            saveLocalVariants(map);
            return map[productId].find((v) => String(v.id) === String(variantId));
        },
        onSuccess: (data, { productId, variantId }) => {
            queryClient.invalidateQueries({ queryKey: ['variants', productId] });
            queryClient.invalidateQueries({ queryKey: ['variant', productId, variantId] });
        },
    });
}

// ── useDeleteVariant ──────────────────────────────────────────────────────────
/**
 * Delete a variant from a product (admin).
 */
export function useDeleteVariant() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ productId, variantId }) => {
            const map      = getLocalVariants();
            map[productId] = (map[productId] || []).filter(
                (v) => String(v.id) !== String(variantId)
            );
            saveLocalVariants(map);
            return { success: true };
        },
        onSuccess: (data, { productId }) => {
            queryClient.invalidateQueries({ queryKey: ['variants', productId] });
        },
    });
}
