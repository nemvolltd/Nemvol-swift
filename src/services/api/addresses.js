import apiClient from './client';

export const addressesApi = {
    getAddresses: async () => {
        const response = await apiClient.get('/addresses');
        const data = response.data.data || response.data;
        return data.addresses || data;
    },

    addAddress: async (addressObj) => {
        const response = await apiClient.post('/addresses', addressObj);
        const data = response.data.data || response.data;
        return data.addresses || data;
    },

    updateAddress: async (addressId, updatedAddress) => {
        const response = await apiClient.put(`/addresses/${addressId}`, updatedAddress);
        const data = response.data.data || response.data;
        return data.addresses || data;
    },

    deleteAddress: async (addressId) => {
        const response = await apiClient.delete(`/addresses/${addressId}`);
        const data = response.data.data || response.data;
        return data.addresses || data;
    }
};
