import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useStore from '../store/useStore';

// ── Local storage helpers ────────────────────────────────────────────────────
const NOTIFICATION_SETTINGS_KEY = 'local-notification-settings';
const CONTACT_INFO_KEY           = 'local-contact-info';

const DEFAULT_NOTIFICATION_SETTINGS = {
    orderUpdates:    true,
    promotions:      true,
    newArrivals:     false,
    priceDrops:      true,
    reviewRequests:  false,
};

const getLocalNotificationSettings = () => {
    try {
        const stored = localStorage.getItem(NOTIFICATION_SETTINGS_KEY);
        return stored ? JSON.parse(stored) : DEFAULT_NOTIFICATION_SETTINGS;
    } catch {
        return DEFAULT_NOTIFICATION_SETTINGS;
    }
};

const saveLocalNotificationSettings = (settings) => {
    try { localStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(settings)); }
    catch { /* ignore */ }
};

// ── useNotificationSettings ───────────────────────────────────────────────────
/**
 * Fetch notification preferences from localStorage (requires login).
 */
export function useNotificationSettings() {
    const isLoggedIn = useStore((s) => s.isLoggedIn);
    return useQuery({
        queryKey: ['notifications'],
        queryFn:  () => getLocalNotificationSettings(),
        enabled:  isLoggedIn,
    });
}

// ── useUpdateNotificationSettings ────────────────────────────────────────────
/**
 * Persist updated notification preferences locally.
 */
export function useUpdateNotificationSettings() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (settings) => {
            const updated = { ...getLocalNotificationSettings(), ...settings };
            saveLocalNotificationSettings(updated);
            return updated;
        },
        onSuccess: (updated) => {
            queryClient.setQueryData(['notifications'], updated);
        },
    });
}

// ── useUpdateContactInfo ──────────────────────────────────────────────────────
/**
 * Update contact info (name, email, phone) — persists in Zustand store + localStorage.
 */
export function useUpdateContactInfo() {
    const queryClient = useQueryClient();
    const setUser     = useStore((s) => s.setUser);
    return useMutation({
        mutationFn: async (infoObj) => {
            const current = useStore.getState().user || {};
            const updated = { ...current, ...infoObj };
            try { localStorage.setItem(CONTACT_INFO_KEY, JSON.stringify(updated)); }
            catch { /* ignore */ }
            return updated;
        },
        onSuccess: (updated) => {
            setUser(updated);
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
}
