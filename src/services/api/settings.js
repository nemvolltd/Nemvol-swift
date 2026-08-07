import apiClient from './client';

export const settingsApi = {
    getNotificationSettings: async () => {
        const response = await apiClient.get('/settings/notifications');
        const data = response.data.data || response.data;
        return data.notificationSettings || data;
    },

    updateNotificationSettings: async (settings) => {
        const response = await apiClient.put('/settings/notifications', settings);
        const data = response.data.data || response.data;
        return data.notificationSettings || data;
    },

    updateContactInfo: async (infoObj) => {
        const response = await apiClient.put('/settings/contact', infoObj);
        const data = response.data.data || response.data;
        return data.user || data;
    }
};
