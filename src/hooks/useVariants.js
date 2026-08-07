import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api/index';

/**
 * Fetch all variants of a product
 */
export function useVariants(productId) {
    return useQuery({
        queryKey: ['variants', productId],
        queryFn: () => api.getVariants(productId),
        enabled: !!productId,
    });
}

/**
 * Fetch a single variant by ID
 */
export function useVariant(productId, variantId) {
    return useQuery({
        queryKey: ['variant', productId, variantId],
        queryFn: () => api.getVariantById(productId, variantId),
        enabled: !!productId && !!variantId,
    });
}

/**
 * Create a new variant for a product
 */
export function useCreateVariant() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ productId, variantData }) => api.createVariant(productId, variantData),
        onSuccess: (data, { productId }) => {
            queryClient.invalidateQueries({ queryKey: ['variants', productId] });
        },
    });
}

/**
 * Update an existing variant of a product
 */
export function useUpdateVariant() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ productId, variantId, variantData }) => api.updateVariant(productId, variantId, variantData),
        onSuccess: (data, { productId, variantId }) => {
            queryClient.invalidateQueries({ queryKey: ['variants', productId] });
            queryClient.invalidateQueries({ queryKey: ['variant', productId, variantId] });
        },
    });
}

/**
 * Delete a variant of a product
 */
export function useDeleteVariant() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ productId, variantId }) => api.deleteVariant(productId, variantId),
        onSuccess: (data, { productId }) => {
            queryClient.invalidateQueries({ queryKey: ['variants', productId] });
        },
    });
}
