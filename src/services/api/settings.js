import { db } from './mockData';
import { delay, LATENCY } from './utils';

export const settingsApi = {
    getNotificationSettings: async () => {
        await delay(LATENCY - 350);
        return { ...db.notificationSettings };
    },

    updateNotificationSettings: async (settings) => {
        await delay(LATENCY - 350);
        db.notificationSettings = { ...db.notificationSettings, ...settings };
        return { ...db.notificationSettings };
    },

    updateContactInfo: async (infoObj) => {
        await delay(LATENCY - 300);
        db.user.contactInfo = { ...db.user.contactInfo, ...infoObj };
        return { ...db.user.contactInfo };
    }
};
