import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api/index';

/**
 * Fetch all categories
 */
export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: api.getCategories,
    });
}

/**
 * Fetch a single category by ID
 */
export function useCategory(id) {
    return useQuery({
        queryKey: ['category', id],
        queryFn: () => api.getCategoryById(id),
        enabled: !!id,
    });
}

/**
 * Create a new category
 */
export function useCreateCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (categoryData) => api.createCategory(categoryData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
}

/**
 * Update an existing category
 */
export function useUpdateCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, categoryData }) => api.updateCategory(id, categoryData),
        onSuccess: (data, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['category', id] });
        },
    });
}

/**
 * Delete a category
 */
export function useDeleteCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
}
