import { db } from './mockData';
import { delay, LATENCY } from './utils';

export const authApi = {
    login: async (email, password) => {
        await delay(LATENCY);
        if (!email) throw new Error('Email is required');
        db.user.isLoggedIn = true;
        db.user.contactInfo.email = email;
        db.user.contactInfo.name = email.split('@')[0];
        return { user: db.user.contactInfo };
    },

    signup: async (name, email, password) => {
        await delay(LATENCY);
        if (!name || !email) throw new Error('Name and email are required');
        db.user.isLoggedIn = true;
        db.user.contactInfo.email = email;
        db.user.contactInfo.name = name;
        return { user: db.user.contactInfo };
    },

    logout: async () => {
        await delay(LATENCY - 200);
        db.user.isLoggedIn = false;
        return { success: true };
    },

    getCurrentUser: async () => {
        await delay(LATENCY - 300);
        return db.user.isLoggedIn ? db.user.contactInfo : null;
    },

    getUsers: async () => {
        await delay(LATENCY - 350);
        return [...db.users];
    }
};
