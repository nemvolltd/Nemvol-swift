import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api/index';

/**
 * Fetch all products (public — no auth required)
 */
export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: api.getProducts,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

/**
 * Fetch a single product by ID
 */
export function useProduct(productId) {
    return useQuery({
        queryKey: ['product', productId],
        queryFn: () => api.getProductById(productId),
        enabled: !!productId,
    });
}

/**
 * Create a new product (admin)
 */
export function useCreateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (productData) => api.createProduct(productData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}

/**
 * Update an existing product (admin)
 */
export function useUpdateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ productId, productData }) => api.updateProduct(productId, productData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}

/**
 * Delete a product (admin)
 */
export function useDeleteProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (productId) => api.deleteProduct(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}
