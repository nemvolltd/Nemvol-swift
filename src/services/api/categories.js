import apiClient from './client';

export const categoriesApi = {
    getCategories: async () => {
        const response = await apiClient.get('/categories');
        const data = response.data.data || response.data;
        // In the API response sample, it returns:
        // {"error":false,"message":"...","data":{"category":{"name":"Fruits", ...}}} or array of categories
        // Let's support array of categories and single category mapping
        if (data.categories) return data.categories;
        if (data.category && Array.isArray(data.category)) return data.category;
        if (data.category) return [data.category];
        if (Array.isArray(data)) return data;
        return [];
    },

    getCategoryById: async (id) => {
        const response = await apiClient.get(`/categories/${id}`);
        const data = response.data.data || response.data;
        return data.category || data;
    },

    createCategory: async (categoryData) => {
        // categoryData is expected to be a FormData object
        const response = await apiClient.post('/categories', categoryData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const data = response.data.data || response.data;
        return data.category || data;
    },

    updateCategory: async (id, categoryData) => {
        // categoryData is expected to be a FormData object
        const response = await apiClient.post(`/categories/${id}`, categoryData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const data = response.data.data || response.data;
        return data.category || data;
    },

    deleteCategory: async (id) => {
        const response = await apiClient.delete(`/categories/${id}`);
        return response.data;
    }
};
