import apiClient from './client';

export const cardsApi = {
    getCards: async () => {
        const response = await apiClient.get('/payment-cards');
        const data = response.data.data || response.data;
        return data.cards || data;
    },

    addCard: async (cardData) => {
        const response = await apiClient.post('/payment-cards', cardData);
        const data = response.data.data || response.data;
        return data.cards || data;
    },

    deleteCard: async (cardId) => {
        const response = await apiClient.delete(`/payment-cards/${cardId}`);
        const data = response.data.data || response.data;
        return data.cards || data;
    },

    setDefaultCard: async (cardId) => {
        const response = await apiClient.patch(`/payment-cards/${cardId}/default`);
        const data = response.data.data || response.data;
        return data.cards || data;
    }
};
