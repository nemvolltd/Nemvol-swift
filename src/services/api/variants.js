import apiClient from './client';

const mapVariant = (v) => {
    if (!v) return null;
    return {
        id: v.id,
        productId: v.product_id,
        sku: v.sku || '',
        attributes: v.attributes || {},
        price: parseFloat(v.price) || 0,
        createdAt: v.created_at,
        updatedAt: v.updated_at
    };
};

export const variantsApi = {
    getVariants: async (productId) => {
        const response = await apiClient.get(`/variants/${productId}`);
        const root = response.data;
        let rawVariants = [];
        if (root && root.data) {
            if (Array.isArray(root.data)) {
                rawVariants = root.data;
            } else if (root.data.variants && Array.isArray(root.data.variants)) {
                rawVariants = root.data.variants;
            } else if (root.data.variant) {
                rawVariants = [root.data.variant];
            } else {
                rawVariants = [root.data];
            }
        } else if (Array.isArray(root)) {
            rawVariants = root;
        }
        return rawVariants.map(mapVariant).filter(Boolean);
    },

    getVariantById: async (productId, variantId) => {
        const response = await apiClient.get(`/variants/${productId}/${variantId}`);
        const root = response.data;
        const rawVariant = root.data?.variant || root.data || root;
        return mapVariant(rawVariant);
    },

    createVariant: async (productId, variantData) => {
        const response = await apiClient.post(`/variants/${productId}`, variantData);
        const root = response.data;
        const rawVariant = root.data?.variant || root.data || root;
        return mapVariant(rawVariant);
    },

    updateVariant: async (productId, variantId, variantData) => {
        const response = await apiClient.put(`/variants/${productId}/${variantId}`, variantData);
        const root = response.data;
        const rawVariant = root.data?.variant || root.data || root;
        return mapVariant(rawVariant);
    },

    deleteVariant: async (productId, variantId) => {
        const response = await apiClient.delete(`/variants/${productId}/${variantId}`);
        return response.data;
    }
};
