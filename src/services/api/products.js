import { db } from './mockData';
import { delay, LATENCY } from './utils';

export const productsApi = {
    getProducts: async () => {
        await delay(LATENCY + 200);
        return [...db.products];
    },

    getProductById: async (id) => {
        await delay(LATENCY);
        const product = db.products.find(p => p.id === parseInt(id));
        if (!product) throw new Error('Product not found');
        return { ...product };
    },

    createProduct: async (productData) => {
        await delay(LATENCY);
        const newId = db.products.length > 0 ? Math.max(...db.products.map(p => p.id)) + 1 : 1;
        const newProduct = {
            id: newId,
            name: productData.name || 'Unnamed Product',
            category: productData.category || 'Unisex',
            price: parseFloat(productData.price) || 0,
            originalPrice: parseFloat(productData.originalPrice) || parseFloat(productData.price) || 0,
            image: productData.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
            images: productData.images || [productData.image],
            description: productData.description || '',
            sizes: productData.sizes || ['S', 'M', 'L']
        };
        db.products.push(newProduct);
        return [...db.products];
    },

    updateProduct: async (id, productData) => {
        await delay(LATENCY);
        const index = db.products.findIndex(p => p.id === parseInt(id));
        if (index === -1) throw new Error('Product not found');
        
        db.products[index] = {
            ...db.products[index],
            ...productData,
            price: parseFloat(productData.price) || db.products[index].price,
            originalPrice: parseFloat(productData.originalPrice) || db.products[index].originalPrice,
            sizes: productData.sizes || db.products[index].sizes
        };
        return [...db.products];
    },

    deleteProduct: async (id) => {
        await delay(LATENCY);
        db.products = db.products.filter(p => p.id !== parseInt(id));
        return [...db.products];
    }
};
