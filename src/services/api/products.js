import apiClient from './client';

const base64ToBlob = (base64Data) => {
    try {
        const arr = base64Data.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    } catch (e) {
        console.error('Failed to convert base64 to Blob', e);
        return null;
    }
};

const mapProduct = (p) => {
    if (!p) return null;
    
    // Extract price
    let price = 0;
    if (p.base_price !== undefined) {
        price = parseFloat(p.base_price);
    } else if (p.price !== undefined) {
        price = parseFloat(p.price);
    }
    
    // Extract original price
    let originalPrice = price;
    if (p.original_price !== undefined) {
        originalPrice = parseFloat(p.original_price);
    } else if (p.originalPrice !== undefined) {
        originalPrice = parseFloat(p.originalPrice);
    }

    // Extract category name
    let category = 'Unisex';
    if (p.categories && p.categories.length > 0) {
        category = p.categories[0].name;
    } else if (p.category) {
        category = typeof p.category === 'object' ? p.category.name : p.category;
    }

    // Extract image
    let image = 'https://placehold.co/600x800/e2e8f0/475569.png?text=Nemvol';
    let images = [];
    if (p.images && p.images.length > 0) {
        images = p.images.map(img => typeof img === 'object' ? img.image_url || img.image || img : img);
        image = images[0];
    } else if (p.image) {
        image = p.image;
        images = [p.image];
    } else if (p.image_url) {
        image = p.image_url;
        images = [p.image_url];
    }

    return {
        id: p.id,
        name: p.name || 'Unnamed Product',
        description: p.description || '',
        price,
        originalPrice,
        category,
        image,
        images,
        stock: p.stock !== undefined ? parseInt(p.stock) : 15,
        sizes: p.sizes || ['S', 'M', 'L']
    };
};

export const productsApi = {
    getProducts: async () => {
        const response = await apiClient.get('/products');
        const root = response.data;
        
        let rawProducts = [];
        if (root && root.data) {
            if (Array.isArray(root.data)) {
                rawProducts = root.data;
            } else if (root.data.data && Array.isArray(root.data.data)) {
                rawProducts = root.data.data;
            } else if (root.data.products && Array.isArray(root.data.products)) {
                rawProducts = root.data.products;
            } else {
                rawProducts = [root.data];
            }
        } else if (Array.isArray(root)) {
            rawProducts = root;
        }

        return rawProducts.map(mapProduct).filter(Boolean);
    },

    getProductById: async (id) => {
        const response = await apiClient.get(`/products/${id}`);
        const root = response.data;
        const rawProduct = root.data?.product || root.data || root;
        return mapProduct(rawProduct);
    },

    createProduct: async (productData) => {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('description', productData.description || '');
        formData.append('base_price', productData.price);
        formData.append('is_active', 'true');
        
        // Add category ID if resolved
        if (productData.categoryId) {
            formData.append('category_ids[0]', productData.categoryId);
        }

        // Add main image uploader
        if (productData.image) {
            if (productData.image.startsWith('data:image/')) {
                const blob = base64ToBlob(productData.image);
                if (blob) formData.append('image', blob, 'main_image.png');
            } else {
                formData.append('image_url', productData.image);
            }
        }

        // Add additional images array
        if (productData.images && productData.images.length > 0) {
            productData.images.forEach((img, idx) => {
                if (img.startsWith('data:image/')) {
                    const blob = base64ToBlob(img);
                    if (blob) formData.append(`images[${idx}]`, blob, `image_${idx}.png`);
                } else {
                    formData.append(`image_urls[${idx}]`, img);
                }
            });
        }

        const response = await apiClient.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const root = response.data;
        const rawProduct = root.data?.product || root.data || root;
        return mapProduct(rawProduct);
    },

    updateProduct: async (id, productData) => {
        const formData = new FormData();
        formData.append('_method', 'PUT'); // Laravel PUT emulation
        formData.append('name', productData.name);
        formData.append('description', productData.description || '');
        formData.append('base_price', productData.price);
        formData.append('is_active', 'true');
        
        if (productData.categoryId) {
            formData.append('category_ids[0]', productData.categoryId);
        }

        if (productData.image) {
            if (productData.image.startsWith('data:image/')) {
                const blob = base64ToBlob(productData.image);
                if (blob) formData.append('image', blob, 'main_image.png');
            } else {
                formData.append('image_url', productData.image);
            }
        }

        if (productData.images && productData.images.length > 0) {
            productData.images.forEach((img, idx) => {
                if (img.startsWith('data:image/')) {
                    const blob = base64ToBlob(img);
                    if (blob) formData.append(`images[${idx}]`, blob, `image_${idx}.png`);
                } else {
                    formData.append(`image_urls[${idx}]`, img);
                }
            });
        }

        const response = await apiClient.post(`/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const root = response.data;
        const rawProduct = root.data?.product || root.data || root;
        return mapProduct(rawProduct);
    },

    deleteProduct: async (id) => {
        const response = await apiClient.delete(`/products/${id}`);
        return response.data;
    }
};
