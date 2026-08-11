import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ── Seed categories ───────────────────────────────────────────────────────────
const CATEGORIES_KEY = 'local-categories';

const SEED_CATEGORIES = [
    { id: 1, name: 'Men',         image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&q=80' },
    { id: 2, name: 'Women',       image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80' },
    { id: 3, name: 'Unisex',      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400&q=80' },
    { id: 4, name: 'Accessories', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80' },
];

const initLocalCategories = () => {
    try {
        const stored = localStorage.getItem(CATEGORIES_KEY);
        if (!stored) {
            localStorage.setItem(CATEGORIES_KEY, JSON.stringify(SEED_CATEGORIES));
            return SEED_CATEGORIES;
        }
        return JSON.parse(stored);
    } catch {
        return SEED_CATEGORIES;
    }
};

const getLocalCategories = () => {
    try { return JSON.parse(localStorage.getItem(CATEGORIES_KEY)) || SEED_CATEGORIES; }
    catch { return SEED_CATEGORIES; }
};

const saveLocalCategories = (cats) => {
    try { localStorage.setItem(CATEGORIES_KEY, JSON.stringify(cats)); }
    catch { /* ignore */ }
};

// ── useCategories ─────────────────────────────────────────────────────────────
/**
 * Fetch all categories from local storage.
 */
export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn:  () => initLocalCategories(),
    });
}

// ── useCategory ───────────────────────────────────────────────────────────────
/**
 * Fetch a single category by ID.
 */
export function useCategory(id) {
    return useQuery({
        queryKey: ['category', id],
        queryFn:  () => {
            const cats = getLocalCategories();
            return cats.find((c) => String(c.id) === String(id)) || null;
        },
        enabled: !!id,
    });
}

// ── useCreateCategory ─────────────────────────────────────────────────────────
/**
 * Add a new category locally (admin).
 */
export function useCreateCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (categoryData) => {
            const current = getLocalCategories();
            const maxId   = current.reduce((m, c) => Math.max(m, c.id), 0);
            const newCat  = { ...categoryData, id: maxId + 1 };
            saveLocalCategories([...current, newCat]);
            return newCat;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
}

// ── useUpdateCategory ─────────────────────────────────────────────────────────
/**
 * Update an existing category locally (admin).
 */
export function useUpdateCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, categoryData }) => {
            const updated = getLocalCategories().map((c) =>
                String(c.id) === String(id) ? { ...c, ...categoryData } : c
            );
            saveLocalCategories(updated);
            return updated.find((c) => String(c.id) === String(id));
        },
        onSuccess: (data, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['category', id] });
        },
    });
}

// ── useDeleteCategory ─────────────────────────────────────────────────────────
/**
 * Delete a category from local storage (admin).
 */
export function useDeleteCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const updated = getLocalCategories().filter((c) => String(c.id) !== String(id));
            saveLocalCategories(updated);
            return { success: true };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
}
