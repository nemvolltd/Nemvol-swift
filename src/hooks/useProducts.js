import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// ── Mock product catalogue ────────────────────────────────────────────────────
const PRODUCTS_KEY = 'local-products';

const SEED_PRODUCTS = [
    {
        id: 1, name: 'Classic White Tee', description: 'Premium 100% cotton everyday essential.',
        price: 24.99, originalPrice: 34.99, category: 'Men', stock: 50,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80'],
    },
    {
        id: 2, name: 'Slim-Fit Chinos', description: 'Versatile slim-fit trousers for any occasion.',
        price: 59.99, originalPrice: 79.99, category: 'Men', stock: 30,
        sizes: ['28', '30', '32', '34', '36'],
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
        images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80'],
    },
    {
        id: 3, name: 'Floral Wrap Dress', description: 'Light summer wrap dress with floral print.',
        price: 49.99, originalPrice: 69.99, category: 'Women', stock: 20,
        sizes: ['XS', 'S', 'M', 'L'],
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
        images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80'],
    },
    {
        id: 4, name: 'High-Waist Joggers', description: 'Comfortable high-waist joggers for active days.',
        price: 44.99, originalPrice: 54.99, category: 'Women', stock: 40,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80',
        images: ['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80'],
    },
    {
        id: 5, name: 'Oversized Hoodie', description: 'Cosy oversized hoodie in heavyweight fleece.',
        price: 64.99, originalPrice: 84.99, category: 'Unisex', stock: 35,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
        images: ['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80'],
    },
    {
        id: 6, name: 'Leather Crossbody Bag', description: 'Genuine leather crossbody bag with adjustable strap.',
        price: 89.99, originalPrice: 119.99, category: 'Accessories', stock: 15,
        sizes: ['One Size'],
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
        images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80'],
    },
    {
        id: 7, name: 'Striped Polo Shirt', description: 'Classic striped polo in breathable piqué cotton.',
        price: 34.99, originalPrice: 44.99, category: 'Men', stock: 25,
        sizes: ['S', 'M', 'L', 'XL'],
        image: 'https://images.unsplash.com/photo-1625910513407-f9e094aa7ccc?w=600&q=80',
        images: ['https://images.unsplash.com/photo-1625910513407-f9e094aa7ccc?w=600&q=80'],
    },
    {
        id: 8, name: 'Knit Cardigan', description: 'Soft knit cardigan perfect for layering.',
        price: 54.99, originalPrice: 74.99, category: 'Women', stock: 18,
        sizes: ['XS', 'S', 'M', 'L'],
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
        images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80'],
    },
];

// ── Initialise local catalogue on first load ──────────────────────────────────
const initLocalProducts = () => {
    try {
        const stored = localStorage.getItem(PRODUCTS_KEY);
        if (!stored) {
            localStorage.setItem(PRODUCTS_KEY, JSON.stringify(SEED_PRODUCTS));
            return SEED_PRODUCTS;
        }
        return JSON.parse(stored);
    } catch {
        return SEED_PRODUCTS;
    }
};

const getLocalProducts = () => {
    try { return JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || SEED_PRODUCTS; }
    catch { return SEED_PRODUCTS; }
};

const saveLocalProducts = (products) => {
    try { localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products)); }
    catch { /* ignore */ }
};

// ── useProducts ───────────────────────────────────────────────────────────────
/**
 * Fetch all products from the local catalogue.
 */
export function useProducts() {
    return useQuery({
        queryKey:  ['products'],
        queryFn:   () => initLocalProducts(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

// ── useProduct ────────────────────────────────────────────────────────────────
/**
 * Fetch a single product by ID from the local catalogue.
 */
export function useProduct(productId) {
    return useQuery({
        queryKey: ['product', productId],
        queryFn:  () => {
            const products = getLocalProducts();
            const found    = products.find((p) => String(p.id) === String(productId));
            if (!found) throw new Error('Product not found.');
            return found;
        },
        enabled: !!productId,
    });
}

// ── useCreateProduct ──────────────────────────────────────────────────────────
/**
 * Add a new product to the local catalogue (admin).
 */
export function useCreateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (productData) => {
            const current    = getLocalProducts();
            const maxId      = current.reduce((m, p) => Math.max(m, p.id), 0);
            const newProduct = {
                ...productData,
                id:            maxId + 1,
                stock:         productData.stock ?? 10,
                sizes:         productData.sizes || ['S', 'M', 'L'],
                originalPrice: productData.originalPrice ?? productData.price,
            };
            const updated = [...current, newProduct];
            saveLocalProducts(updated);
            return newProduct;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}

// ── useUpdateProduct ──────────────────────────────────────────────────────────
/**
 * Update an existing product in the local catalogue (admin).
 */
export function useUpdateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ productId, productData }) => {
            const updated = getLocalProducts().map((p) =>
                String(p.id) === String(productId) ? { ...p, ...productData } : p
            );
            saveLocalProducts(updated);
            return updated.find((p) => String(p.id) === String(productId));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}

// ── useDeleteProduct ──────────────────────────────────────────────────────────
/**
 * Delete a product from the local catalogue (admin).
 */
export function useDeleteProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (productId) => {
            const updated = getLocalProducts().filter(
                (p) => String(p.id) !== String(productId)
            );
            saveLocalProducts(updated);
            return { success: true };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
}
