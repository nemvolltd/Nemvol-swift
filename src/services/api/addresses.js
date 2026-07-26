import { db } from './mockData';
import { delay, LATENCY } from './utils';

export const addressesApi = {
    getAddresses: async () => {
        await delay(LATENCY);
        return [...db.addresses];
    },

    addAddress: async (addressObj) => {
        await delay(LATENCY);
        const newId = db.addresses.length > 0 ? Math.max(...db.addresses.map(a => a.id)) + 1 : 1;
        const newAddress = { ...addressObj, id: newId };
        if (newAddress.isDefault) {
            db.addresses = db.addresses.map(a => ({ ...a, isDefault: false })).concat(newAddress);
        } else {
            db.addresses.push(newAddress);
        }
        return [...db.addresses];
    },

    updateAddress: async (addressId, updatedAddress) => {
        await delay(LATENCY);
        db.addresses = db.addresses.map(a => {
            if (a.id === addressId) {
                const updated = { ...a, ...updatedAddress };
                return updated;
            }
            return a;
        });
        if (updatedAddress.isDefault) {
            db.addresses = db.addresses.map(a => a.id === addressId ? { ...a, isDefault: true } : { ...a, isDefault: false });
        }
        return [...db.addresses];
    },

    deleteAddress: async (addressId) => {
        await delay(LATENCY);
        db.addresses = db.addresses.filter(a => a.id !== addressId);
        return [...db.addresses];
    }
};
